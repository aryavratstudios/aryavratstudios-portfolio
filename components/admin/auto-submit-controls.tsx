"use client";

import { useTransition } from "react";

export function AutoSubmitInput({
    name,
    defaultValue,
    className,
    action
}: {
    name: string;
    defaultValue: string | number | undefined;
    className?: string;
    action: (formData: FormData) => Promise<void>;
}) {
    const [isPending, startTransition] = useTransition();

    return (
        <input
            name={name}
            defaultValue={defaultValue}
            className={className}
            disabled={isPending}
            onBlur={(e) => {
                const formData = new FormData(e.target.form!);
                startTransition(async () => {
                    await action(formData);
                });
            }}
        />
    );
}

export function AutoSubmitSelect({
    name,
    defaultValue,
    className,
    children,
    action
}: {
    name: string;
    defaultValue?: string;
    className?: string;
    children: React.ReactNode;
    action: (formData: FormData) => Promise<void>;
}) {
    const [isPending, startTransition] = useTransition();

    return (
        <select
            name={name}
            defaultValue={defaultValue}
            className={className}
            disabled={isPending}
            onChange={(e) => {
                const formData = new FormData(e.target.form!);
                startTransition(async () => {
                    await action(formData);
                });
            }}
        >
            {children}
        </select>
    );
}
