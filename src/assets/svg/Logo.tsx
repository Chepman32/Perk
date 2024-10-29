import {PropsWithChildren} from 'react';
import Svg, {Path, G, Defs, Rect, ClipPath} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

export const Logo = ({width, height}: PropsWithChildren<Props>) => (
  <Svg
    width={width ? width : '50'}
    height={height ? height : '40'}
    viewBox="0 0 168 136"
    fill="none">
    <G clipPath="url(#clip0_1236_19764)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.6542 85.8981C75.0978 84.8488 78.7571 84.7216 82.2655 85.5291C84.1527 85.9634 85.3299 87.8427 84.8947 89.7266C84.4596 91.6104 82.5769 92.7854 80.6897 92.3511C78.3793 91.8193 75.9695 91.9031 73.7018 92.594C71.4341 93.285 69.3881 94.5588 67.7691 96.2878C66.15 98.0168 65.0147 100.14 64.4769 102.445C63.9392 104.75 64.0178 107.156 64.7051 109.421C65.2664 111.271 64.2189 113.226 62.3653 113.786C60.5117 114.346 58.5539 113.301 57.9926 111.45C56.949 108.011 56.8295 104.358 57.6461 100.857C58.4627 97.3572 60.1867 94.1327 62.6453 91.5072C65.1039 88.8816 68.2107 86.9473 71.6542 85.8981Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M67.3138 72.5823C71.6455 71.2273 76.2022 70.7372 80.7236 71.1401C85.245 71.5429 89.6427 72.8307 93.6655 74.9301C97.6883 77.0294 101.258 79.8991 104.169 83.3754C105.412 84.8585 105.214 87.0661 103.728 88.3062C102.243 89.5463 100.031 89.3492 98.7886 87.8661C96.4677 85.0952 93.6227 82.8077 90.4161 81.1343C87.2095 79.4609 83.7041 78.4344 80.1001 78.1133C76.496 77.7922 72.8639 78.1828 69.4111 79.2629C65.9583 80.3429 62.7525 82.0913 59.9766 84.4081C57.2007 86.7249 54.9091 89.5647 53.2327 92.7655C51.5563 95.9664 50.5279 99.4654 50.2062 103.063C49.8845 106.661 50.2758 110.286 51.3578 113.733C52.4399 117.179 54.1913 120.379 56.5123 123.15C57.7546 124.633 57.5572 126.841 56.0714 128.081C54.5856 129.321 52.374 129.124 51.1317 127.641C48.2199 124.165 46.0226 120.15 44.6652 115.826C43.3078 111.502 42.8168 106.954 43.2204 102.441C43.6239 97.9273 44.9141 93.5375 47.0172 89.522C49.1204 85.5064 51.9952 81.9436 55.4777 79.0371C58.9602 76.1306 62.9822 73.9372 67.3138 72.5823Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.8214 60.5785C63.4661 57.5091 70.7093 55.9464 78.0308 56.0024C85.3523 56.0585 92.5706 57.732 99.1674 60.9028C105.764 64.0736 111.576 68.663 116.185 74.3416C120.794 80.0202 124.087 86.647 125.826 93.7463C126.287 95.6242 125.134 97.5189 123.253 97.9782C121.372 98.4375 119.474 97.2875 119.014 95.4096C117.52 89.3142 114.693 83.6245 110.736 78.7489C106.778 73.8734 101.789 69.933 96.1246 67.2106C90.4607 64.4882 84.2632 63.0513 77.977 63.0032C71.6908 62.955 65.472 64.2968 59.7669 66.9321C54.0618 69.5675 49.012 73.431 44.98 78.2454C40.9481 83.0597 38.034 88.7054 36.447 94.7772C34.86 100.849 34.6395 107.196 35.8013 113.363C36.963 119.53 39.4783 125.364 43.1664 130.445C44.3027 132.011 43.9523 134.2 42.3839 135.334C40.8155 136.468 38.623 136.118 37.4867 134.553C33.1911 128.634 30.2616 121.84 28.9085 114.657C27.5554 107.474 27.8122 100.082 29.6606 93.0098C31.509 85.938 34.903 79.3624 39.599 73.7551C44.2951 68.1478 50.1766 63.6479 56.8214 60.5785Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M61.0027 45.2489C69.4373 42.9271 78.2658 42.3953 86.9189 43.6879C95.572 44.9806 103.858 48.0689 111.242 52.7539C118.626 57.4388 124.945 63.6163 129.791 70.8882C134.636 78.1601 137.902 86.3649 139.376 94.9738C139.703 96.8794 138.42 98.6883 136.511 99.0141C134.602 99.3399 132.789 98.0592 132.463 96.1536C131.154 88.509 128.254 81.2231 123.951 74.7656C119.648 68.3082 114.037 62.8225 107.48 58.6623C100.923 54.5021 93.5648 51.7597 85.8809 50.6118C78.1969 49.4639 70.3572 49.9361 62.8673 51.998C55.3773 54.0598 48.4034 57.6654 42.395 62.5825C36.3866 67.4996 31.4771 73.6189 27.9831 80.546C24.4891 87.4731 22.4881 95.0541 22.1091 102.8C21.7301 110.547 22.9815 118.286 25.7827 125.52C26.4809 127.324 25.5825 129.35 23.776 130.047C21.9695 130.744 19.939 129.848 19.2408 128.044C16.0863 119.898 14.677 111.182 15.1038 102.459C15.5306 93.7356 17.784 85.1984 21.7187 77.3976C25.6534 69.5969 31.1821 62.7057 37.9483 57.1685C44.7145 51.6312 52.5681 47.5708 61.0027 45.2489Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M73.0969 28.1306C93.0442 26.9609 112.676 33.512 127.908 46.4214C143.14 59.3307 152.8 77.6046 154.879 97.442C155.081 99.3648 153.683 101.087 151.757 101.288C149.83 101.489 148.105 100.093 147.904 98.1706C146.012 80.1249 137.225 63.5016 123.368 51.7582C109.512 40.0149 91.6538 34.0555 73.5082 35.1195C55.3625 36.1835 38.3262 44.189 25.9426 57.471C13.5591 70.753 6.78151 88.289 7.01966 106.432C7.04504 108.365 5.4957 109.952 3.55911 109.978C1.62253 110.003 0.0320477 108.456 0.00667272 106.523C-0.255125 86.5793 7.19537 67.3022 20.8085 52.7014C34.4217 38.1006 53.1495 29.3002 73.0969 28.1306Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M149.82 56.5831C151.464 55.5621 153.627 56.0653 154.65 57.707C162.184 69.7995 166.753 83.4958 167.987 97.6828C168.154 99.6088 166.726 101.306 164.796 101.473C162.867 101.64 161.167 100.214 160.999 98.2881C159.861 85.1984 155.645 72.5615 148.694 61.4043C147.671 59.7626 148.175 57.6041 149.82 56.5831Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M55.3926 17.7649C70.2425 14.0114 85.803 14.0745 100.622 17.9482C102.495 18.438 103.617 20.3511 103.126 22.2213C102.635 24.0915 100.719 25.2106 98.8451 24.7208C85.1724 21.1467 70.8155 21.0885 57.1142 24.5516C43.4129 28.0148 30.8139 34.8863 20.493 44.525C19.0787 45.8458 16.8595 45.7721 15.5364 44.3604C14.2132 42.9487 14.287 40.7335 15.7013 39.4127C26.8875 28.9659 40.5427 21.5183 55.3926 17.7649Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75.3049 3.46072C75.3269 1.52758 76.9147 -0.0217308 78.8513 0.000230619C82.9687 0.0469232 87.0799 0.33373 91.1638 0.859186C93.0847 1.10633 94.4411 2.86105 94.1935 4.77845C93.9459 6.69585 92.188 8.04985 90.2672 7.8027C86.4543 7.31211 82.6159 7.04434 78.7717 7.00074C76.835 6.97878 75.2829 5.39386 75.3049 3.46072Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1236_19764">
        <Rect width="168" height="136" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);