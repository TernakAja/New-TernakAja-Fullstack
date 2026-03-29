import { Icon } from "lucide-react";

export class Icons {
    static appIcon = ({ width, height, className }: { width?: number, height?: number, className?: string } = {}) => {
        return <img src="/app_icon.svg" alt="TernakAja Logo" width={width ?? 50} height={height ?? 50} className={className} />;
    };
}
