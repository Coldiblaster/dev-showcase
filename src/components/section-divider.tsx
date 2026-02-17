import { Separator } from "@/components/ui/separator";
import { cn, MAX_WIDTH_MAP, type MaxWidth } from "@/lib/utils";

/** Props do divisor de seção. */
interface SectionDividerProps {
  maxWidth?: MaxWidth;
}

/** Divisor horizontal com largura máxima configurável. */
export function SectionDivider({ maxWidth = "5xl" }: SectionDividerProps) {
  return (
    <div className={cn("mx-auto px-6", MAX_WIDTH_MAP[maxWidth])}>
      <Separator />
    </div>
  );
}
