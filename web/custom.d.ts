declare module '*.svg' {
    const imgSrc: string;
    export default imgSrc;
}

declare module '*.module.scss' {
    const content: {
        [className: string]: string;
    };
    export default content;
}
