import React from 'react';

interface IconProps {
  className?: string;
  onClick?: () => void;
}

export const LogoIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <rect width="24" height="24" rx="4" fill="#1E88E5" />
      <path d="M8 9H16M8 12H16M8 15H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export const AddIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const CheckIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const CloseIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const SendIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 1024 1024"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M1014.229333 143.530667a42.666667 42.666667 0 0 1 5.802667 45.141333l-305.066667 655.146667a42.666667 42.666667 0 0 1-63.146666 16.981333l-234.666667-163.797333a42.666667 42.666667 0 0 1 48.853333-69.973334l193.024 134.741334 245.888-528.085334L146.816 422.656l156.842667 104.234667a42.666667 42.666667 0 0 0 45.056 1.365333l235.690666-137.088a42.666667 42.666667 0 0 1 42.922667 73.770667L391.637333 602.026667a128 128 0 0 1-135.253333-4.053334L19.072 440.192a42.666667 42.666667 0 0 1 13.312-76.928l938.666667-233.984a42.666667 42.666667 0 0 1 43.221333 14.250667z" stroke="currentColor" fill="#75C82B" />
      <path d="M481.408 701.098667a42.666667 42.666667 0 0 1 1.92 60.288L329.813333 925.184A42.666667 42.666667 0 0 1 256 896v-163.797333a42.666667 42.666667 0 1 1 85.333333 0v55.893333l79.786667-85.077333a42.666667 42.666667 0 0 1 60.288-1.92z" stroke="currentColor" fill="#75C82B" />
    </svg>
  );
};

export const EditIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M11 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H18C18.5523 20 19 19.5523 19 19V12M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const DeleteIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const SettingsIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.4 15.0001C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5844 19.73 16.8201L19.79 16.8801C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.2951C20.3766 18.558 20.3248 18.8183 20.2241 19.0611C20.1235 19.3039 19.976 19.5245 19.79 19.7101C19.6043 19.896 19.3837 20.0435 19.1409 20.1442C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1121 20.2966 17.8518 20.2448 17.609 20.1442C17.3662 20.0435 17.1456 19.896 16.96 19.7101L16.9 19.6501C16.6643 19.4196 16.3649 19.2649 16.0405 19.2061C15.7161 19.1473 15.3815 19.187 15.08 19.3201C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.8301V21.0001C14.08 21.5305 13.8693 22.0392 13.4942 22.4142C13.1191 22.7893 12.6104 23.0001 12.08 23.0001C11.5496 23.0001 11.0409 22.7893 10.6658 22.4142C10.2907 22.0392 10.08 21.5305 10.08 21.0001V20.9101C10.0723 20.579 9.96512 20.2581 9.77251 19.9879C9.5799 19.7177 9.31074 19.5095 9 19.3901C8.69847 19.257 8.36385 19.2173 8.03941 19.2761C7.71498 19.3349 7.41558 19.4896 7.17999 19.7201L7.11999 19.7801C6.93425 19.966 6.71368 20.1135 6.47088 20.2142C6.22808 20.3148 5.96783 20.3666 5.70499 20.3666C5.44216 20.3666 5.18191 20.3148 4.93911 20.2142C4.69631 20.1135 4.47574 19.966 4.28999 19.7801C4.10405 19.5944 3.95653 19.3738 3.85588 19.131C3.75523 18.8882 3.70343 18.6279 3.70343 18.3651C3.70343 18.1022 3.75523 17.8419 3.85588 17.5991C3.95653 17.3563 4.10405 17.1358 4.28999 16.9501L4.34999 16.8901C4.58054 16.6545 4.73519 16.3551 4.794 16.0306C4.85282 15.7062 4.81312 15.3716 4.67999 15.0701C4.55325 14.7743 4.34284 14.5221 4.07456 14.3444C3.80627 14.1667 3.49186 14.0714 3.16999 14.0701H2.99999C2.46956 14.0701 1.96086 13.8594 1.58579 13.4843C1.21071 13.1093 1 12.6006 1 12.0701C1 11.5397 1.21071 11.031 1.58579 10.656C1.96086 10.2809 2.46956 10.0701 2.99999 10.0701H3.08999C3.42114 10.0624 3.742 9.95527 4.0122 9.76265C4.28241 9.57003 4.49065 9.30087 4.60999 9.0001C4.74312 8.69857 4.78282 8.36395 4.724 8.03951C4.66519 7.71508 4.51054 7.41568 4.27999 7.1801L4.21999 7.1201C4.03405 6.93435 3.88653 6.71378 3.78588 6.47098C3.68523 6.22818 3.63343 5.96793 3.63343 5.7051C3.63343 5.44226 3.68523 5.18201 3.78588 4.93921C3.88653 4.69641 4.03405 4.47584 4.21999 4.2901C4.40574 4.10415 4.62631 3.95663 4.86911 3.85598C5.11191 3.75533 5.37216 3.70353 5.63499 3.70353C5.89782 3.70353 6.15807 3.75533 6.40087 3.85598C6.64367 3.95663 6.86424 4.10415 7.04999 4.2901L7.10999 4.3501C7.34558 4.58064 7.64498 4.73529 7.96941 4.7941C8.29385 4.85292 8.62847 4.81322 8.92999 4.6801H8.99999C9.29582 4.55335 9.54802 4.34294 9.72569 4.07466C9.90337 3.80638 9.99872 3.49196 9.99999 3.1701V3.0001C9.99999 2.46967 10.2107 1.96097 10.5858 1.5859C10.9608 1.21082 11.4695 1.0001 12 1.0001C12.5304 1.0001 13.0391 1.21082 13.4142 1.5859C13.7893 1.96097 14 2.46967 14 3.0001V3.0901C14.0013 3.41196 14.0966 3.72638 14.2743 3.99466C14.452 4.26294 14.7042 4.47335 15 4.6001C15.3015 4.73322 15.6361 4.77293 15.9606 4.71411C16.285 4.6553 16.5844 4.50064 16.82 4.2701L16.88 4.2101C17.0657 4.02415 17.2863 3.87663 17.5291 3.77598C17.7719 3.67533 18.0322 3.62354 18.295 3.62354C18.5578 3.62354 18.8181 3.67533 19.0609 3.77598C19.3037 3.87663 19.5243 4.02415 19.71 4.2101C19.896 4.39584 20.0435 4.61641 20.1441 4.85921C20.2448 5.10201 20.2966 5.36226 20.2966 5.6251C20.2966 5.88793 20.2448 6.14818 20.1441 6.39098C20.0435 6.63378 19.896 6.85435 19.71 7.0401L19.65 7.1001C19.4195 7.33568 19.2648 7.63508 19.206 7.95951C19.1472 8.28395 19.1869 8.61857 19.32 8.9201V9.0001C19.4468 9.29593 19.6572 9.54813 19.9255 9.7258C20.1938 9.90347 20.5082 9.99883 20.83 10.0001H21C21.5304 10.0001 22.0391 10.2108 22.4142 10.5859C22.7893 10.961 23 11.4697 23 12.0001C23 12.5305 22.7893 13.0392 22.4142 13.4143C22.0391 13.7894 21.5304 14.0001 21 14.0001H20.91C20.5882 14.0013 20.2738 14.0967 20.0055 14.2744C19.7372 14.4521 19.5268 14.7043 19.4 15.0001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const UserIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const ChevronDownIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const ChevronLeftIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const FileIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const ChatIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const StopIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <rect x="6" y="6" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

export const InfoIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const GithubIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.50001C19.9988 8.30498 19.5325 7.15732 18.7 6.30001C19.0905 5.26198 19.0545 4.11164 18.6 3.10001C18.6 3.10001 17.5 2.80001 15.1 4.40001C13.0672 3.8706 10.9328 3.8706 8.9 4.40001C6.5 2.80001 5.4 3.10001 5.4 3.10001C4.9455 4.11164 4.90953 5.26198 5.3 6.30001C4.46745 7.15732 4.00122 8.30498 4 9.50001C4 14.1 6.7 15.2 9.5 15.5C8.9 16.1 8.9 16.7 9 17.5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const HideIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M11 17L6 12L11 7M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const ShowIcon: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M13 17L18 12L13 7M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}; 