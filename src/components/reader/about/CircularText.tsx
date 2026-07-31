import clsx from "clsx";

interface CircularTextProps {
    text: string;
    className?: string;
}

export default function CircularText({
    text,
    className,
}: CircularTextProps) {
    return (
        <svg
            viewBox="0 0 320 320"
            className={clsx(
                "absolute inset-0 h-full w-full animate-spin-slow",
                className
            )}
            aria-hidden="true"
        >
            <defs>
                <path
                    id="circlePath"
                    d="
                        M160,160
                        m-145,0
                        a145,145 0 1,1 290,0
                        a145,145 0 1,1 -290,0
                    "
                />
            </defs>

            <text
                fill="#9C938D"
                fontSize="13"
                letterSpacing="5"
            >
                <textPath href="#circlePath">
                    {text}
                </textPath>
            </text>
        </svg>
    );
}