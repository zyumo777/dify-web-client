import { StreamChunk, MessageEndChunk } from '@/types';

// 解析SSE（Server-Sent Events）流
export const parseSSEResponse = (chunk: string): StreamChunk | MessageEndChunk | null => {
  try {
    // 移除"data: "前缀
    if (chunk.startsWith('data: ')) {
      const jsonStr = chunk.substring(6);
      return JSON.parse(jsonStr);
    }
    return null;
  } catch (error) {
    console.error('解析SSE响应失败:', error);
    return null;
  }
};

// 处理文本内容中的转义字符
export const decodeStreamContent = (content: string): string => {
  try {
    // 处理Unicode转义序列，如 \u4f60\u597d
    return content.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
      return String.fromCodePoint(parseInt(hex, 16));
    });
  } catch (error) {
    console.error('解码流内容失败:', error);
    return content;
  }
};

// 处理流式响应
export const handleStream = (
  response: Response,
  onChunk: (chunk: StreamChunk) => void,
  onComplete: (messageEndChunk: MessageEndChunk) => void,
  onError: (error: Error) => void
): Promise<void> => {
  if (!response.body) {
    onError(new Error('响应体为空'));
    return Promise.reject(new Error('响应体为空'));
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const processStream = async (): Promise<void> => {
    try {
      const { done, value } = await reader.read();
      if (done) {
        // 处理缓冲区中的最后一个事件（如果有）
        if (buffer.trim() !== '') {
          const parsedChunk = parseSSEResponse(buffer);
          if (parsedChunk) {
            if (parsedChunk.event === 'message_end') {
              onComplete(parsedChunk as MessageEndChunk);
            } else if (parsedChunk.event === 'message') {
              onChunk(parsedChunk as StreamChunk);
            }
          }
        }
        return;
      }

      // 解码二进制数据为文本
      const text = decoder.decode(value, { stream: true });
      buffer += text;

      // 处理可能包含多个事件的缓冲区
      const lines = buffer.split('\n\n');
      // 保留最后一个可能不完整的行
      buffer = lines.pop() || '';

      // 处理每一行
      for (const line of lines) {
        if (line.trim() === '') continue;

        const parsedChunk = parseSSEResponse(line);
        if (!parsedChunk) continue;

        if (parsedChunk.event === 'message_end') {
          onComplete(parsedChunk as MessageEndChunk);
        } else if (parsedChunk.event === 'message') {
          onChunk(parsedChunk as StreamChunk);
        } else if (parsedChunk.event === 'error') {
          onError(new Error(`Stream error: ${JSON.stringify(parsedChunk)}`));
          return;
        }
      }

      // 继续读取
      return processStream();
    } catch (error) {
      console.error('处理流失败:', error);
      onError(error instanceof Error ? error : new Error('未知错误'));
    }
  };

  // 开始处理流
  return processStream().catch((error) => {
    onError(error);
    throw error;
  });
};