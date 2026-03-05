"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    if (cpf && senha) {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex h-screen bg-gray-950">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col items-center justify-center text-center bg-blue-950 px-10">
        <h1 className="text-5xl font-bold mb-6 text-white">
          Farmácia
        </h1>
        <p className="text-lg mb-4 text-blue-200 w-80">
          Sistema integrado de gestão farmacêutica
        </p>
        <p className="text-sm text-blue-300 w-72">
          Controle de estoque, frente de caixa, medicamentos e relatórios em um só lugar.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gray-950">
        <div className="w-[380px]">
          <h2 className="text-3xl font-semibold mb-2 text-white">
            Bem-vindo de volta!
          </h2>
          <p className="text-sm mb-8 text-gray-400">
            Faça login para acessar o sistema
          </p>

          {/* CPF */}
          <div className="flex items-center border border-gray-700 rounded-lg px-4 py-3 mb-4 bg-gray-900">
            <FaUser className="mr-3 text-gray-400" />
            <input
              className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          {/* Senha */}
          <div className="flex items-center border border-gray-700 rounded-lg px-4 py-3 mb-6 bg-gray-900">
            <FaLock className="mr-3 text-gray-400" />
            <input
              type="password"
              className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition text-white font-medium"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}