"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan Kata sandi wajib diisi" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Return standard friendly error
    if (error.message.includes("Invalid login")) {
        return { error: "Email atau kata sandi yang Anda masukkan salah." };
    }
    if(error.message.includes("fetch failed")) return {error: "Periksa koneksi anda"}

    return { error: error.message };
  }
  
  // Successful login, redirect to dashboard
  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
