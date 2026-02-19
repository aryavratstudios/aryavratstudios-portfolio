"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function login(formData: FormData) {
    // Rate limiting for login attempts
    const email = formData.get("email") as string;
    const rateCheck = checkRateLimit(email, "auth-login");
    if (!rateCheck.allowed) {
        redirect("/login?error=Too many login attempts. Please wait 15 minutes.");
    }

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
    // Rate limiting for signup attempts
    const email = formData.get("email") as string;
    const rateCheck = checkRateLimit(email, "auth-signup");
    if (!rateCheck.allowed) {
        redirect("/login?error=Too many signup attempts. Please try again later.");
    }

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
