declare module 'react-kakao-link'{
    interface KakaoLinkDefaultProps {
        template: any;
        jsKey: string;
        className?: string;
    }

    interface KakaoLinkScrapProps {
        requestUrl: string;
        jsKey: string;
        className?: string;
    }


    const KakaoLinkDefault: React.FunctionComponent<KakaoLinkDefaultProps>
    const KakaoLinkScrap: React.FunctionComponent<KakaoLinkScrapProps>

    export { KakaoLinkDefault, KakaoLinkScrap }
}