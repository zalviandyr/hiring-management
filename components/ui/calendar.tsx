"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames, useDayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  const locale = props.lang ?? undefined;

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-neutral-10 border-2 border-neutral-10 shadow rounded-lg group/calendar p-3 [--cell-size:--spacing(9)] [--cell-height:var(--cell-size)] [--cell-width:var(--cell-size)]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale, { month: "short" }),
        formatCaption: (month) =>
          month.toLocaleDateString(locale, { month: "short", year: "numeric" }),
        formatWeekdayName: (date) => date.toLocaleDateString(locale, { weekday: "narrow" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("flex gap-4 flex-col md:flex-row relative", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-height) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-height) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-height) w-full px-(--cell-width)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-height) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-neutral-40 border border-neutral-40 shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute bg-popover inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-bold",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-neutral-100 font-bold rounded-md flex-1 text-sm select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-width)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative flex w-(--cell-width) min-w-(--cell-width) basis-(--cell-width) h-(--cell-height) items-stretch justify-stretch p-0 text-center text-sm [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day select-none",
          defaultClassNames.day
        ),
        range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn("text-neutral-60 aria-selected:text-neutral-60", defaultClassNames.outside),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
        },
        PreviousMonthButton: (props) => <CalendarPreviousMonthButton {...props} />,
        NextMonthButton: (props) => <CalendarNextMonthButton {...props} />,
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex h-(--cell-height) w-(--cell-width) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

type CalendarNavButtonProps = React.ComponentProps<"button">;

function CalendarPreviousMonthButton({
  className,
  children,
  onClick,
  tabIndex,
  "aria-label": ariaLabel,
  "aria-disabled": ariaDisabled,
  ...rest
}: CalendarNavButtonProps) {
  const { months, goToMonth, dayPickerProps, previousMonth } = useDayPicker();
  const firstDisplayedMonth = months[0]?.date;
  const previousYearDate = React.useMemo(() => {
    if (!firstDisplayedMonth) return undefined;
    const date = new Date(firstDisplayedMonth);
    date.setFullYear(date.getFullYear() - 1);
    return date;
  }, [firstDisplayedMonth]);

  const minNavigableMonth = React.useMemo(() => {
    if (dayPickerProps.fromMonth) {
      return new Date(
        dayPickerProps.fromMonth.getFullYear(),
        dayPickerProps.fromMonth.getMonth(),
        1
      );
    }

    if (typeof dayPickerProps.fromYear === "number") {
      return new Date(dayPickerProps.fromYear, 0, 1);
    }

    return undefined;
  }, [dayPickerProps.fromMonth, dayPickerProps.fromYear]);

  const canJumpYear =
    !!previousYearDate && (!minNavigableMonth || previousYearDate >= minNavigableMonth);

  const isDisabled =
    ariaDisabled === true || ariaDisabled === "true" || !previousMonth || !canJumpYear;
  const locale = dayPickerProps.lang ?? undefined;
  const previousYearLabel =
    previousYearDate?.toLocaleString(locale, { month: "long", year: "numeric" }) ??
    "previous years";

  const handlePreviousYearClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!previousYearDate || isDisabled) return;
      goToMonth(previousYearDate);
      dayPickerProps.onPrevClick?.(previousYearDate);
    },
    [dayPickerProps, goToMonth, isDisabled, previousYearDate]
  );

  return (
    <span className="inline-flex items-stretch gap-px">
      <button
        type="button"
        className={cn(
          className,
          "rounded-r-none h-(--cell-height) w-auto px-2 aria-disabled:opacity-50"
        )}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : tabIndex}
        disabled={isDisabled}
        onClick={handlePreviousYearClick}
      >
        <ChevronsLeftIcon className="size-4" />
      </button>
      <button
        {...rest}
        onClick={onClick}
        className={cn(className, "rounded-l-none")}
        aria-label={ariaLabel}
        aria-disabled={ariaDisabled}
        tabIndex={tabIndex}
        disabled={isDisabled}
      >
        {children}
      </button>
    </span>
  );
}

function CalendarNextMonthButton({
  className,
  children,
  onClick,
  tabIndex,
  "aria-label": ariaLabel,
  "aria-disabled": ariaDisabled,
  ...rest
}: CalendarNavButtonProps) {
  const { months, goToMonth, dayPickerProps, nextMonth } = useDayPicker();
  const firstDisplayedMonth = months[0]?.date;
  const nextYearDate = React.useMemo(() => {
    if (!firstDisplayedMonth) return undefined;
    const date = new Date(firstDisplayedMonth);
    date.setFullYear(date.getFullYear() + 1);
    return date;
  }, [firstDisplayedMonth]);

  const maxNavigableMonth = React.useMemo(() => {
    if (dayPickerProps.toMonth) {
      return new Date(dayPickerProps.toMonth.getFullYear(), dayPickerProps.toMonth.getMonth(), 1);
    }

    if (typeof dayPickerProps.toYear === "number") {
      return new Date(dayPickerProps.toYear, 11, 1);
    }

    return undefined;
  }, [dayPickerProps.toMonth, dayPickerProps.toYear]);

  const canJumpYear = !!nextYearDate && (!maxNavigableMonth || nextYearDate <= maxNavigableMonth);

  const isDisabled = ariaDisabled === true || ariaDisabled === "true" || !nextMonth || !canJumpYear;
  const locale = dayPickerProps.lang ?? undefined;
  const nextYearLabel =
    nextYearDate?.toLocaleString(locale, { month: "long", year: "numeric" }) ?? "next years";

  const handleNextYearClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!nextYearDate || isDisabled) return;
      goToMonth(nextYearDate);
      dayPickerProps.onNextClick?.(nextYearDate);
    },
    [dayPickerProps, goToMonth, isDisabled, nextYearDate]
  );

  return (
    <span className="inline-flex items-stretch gap-px">
      <button
        {...rest}
        onClick={onClick}
        className={cn(className, "rounded-r-none")}
        aria-label={ariaLabel}
        aria-disabled={ariaDisabled}
        tabIndex={tabIndex}
        disabled={isDisabled}
      >
        {children}
      </button>
      <button
        type="button"
        className={cn(
          className,
          "rounded-l-none h-(--cell-height) w-auto px-2 aria-disabled:opacity-50"
        )}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : tabIndex}
        disabled={isDisabled}
        onClick={handleNextYearClick}
      >
        <ChevronsRightIcon className="size-4" />
      </button>
    </span>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex size-auto h-full w-full min-w-0 flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
