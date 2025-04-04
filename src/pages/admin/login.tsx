import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Head from "next/head";
import AuthForm from "@/slices/auth/AuthForm";

const AdminLoginPage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // Если пользователь уже авторизован, перенаправляем на админ-панель
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Вход в административную панель | Поплаваем</title>
        <meta name="description" content="Вход в административную панель детских бассейнов" />
      </Head>
      <AuthForm />
    </>
  );
};

export default AdminLoginPage;