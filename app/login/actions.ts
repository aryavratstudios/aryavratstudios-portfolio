"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in a real app, you might want to validate this with Zod
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect("/login?error=Could not authenticate user");
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in a real app, you might want to validate this with Zod
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
    };

    const full_name = `${data.first_name} ${data.last_name}`.trim();

    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                full_name: full_name,
            }
        }
    });

    if (error) {
        redirect("/login?error=Could not create user");
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}
