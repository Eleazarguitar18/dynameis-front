import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { url_base } from "../../constants/url_base";
import axios from "axios";
import { useNavigate } from "react-router";
export default function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(`envio al backend: ${(formData.email, formData.password)}`);

      // Con Axios no necesitas hacer JSON.stringify, lo hace solo
      const response = await axios.post(`${url_base}/auth/login`, formData);

      // 2. Guardar el token para futuras peticiones
      localStorage.setItem("token", response.data.access_token);

      // 3. Redirigir al Home (que según tu App.tsx es el Dashboard)
      navigate("/");

      console.log("Bienvenido:", response.data.user);
    } catch (error: any) {
      // Axios agrupa los errores de red y de servidor (4xx, 5xx) aquí
      const message = error.response?.data?.message || "Error al conectar";
      alert(message);
    } finally {
      setLoading(false);
    }
  };
  // const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        {/* <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link> */}
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-light text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              CAMPAMENTO ACHOCALLA 2026
            </h1>
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Iniciar sesion
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ¡Ingresa tu usario y contraseña para ingresar!
            </p>
            {/* <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  1 Timoteo 4:12
                </span>
              </div> */}
          </div>
          <div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Usuario <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="info@gmail.com"
                    // required // Validación básica del navegador
                  />
                </div>

                <div>
                  <Label>
                    Contraseña <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      // required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  {/* type="submit" hace que el formulario dispare el handleSubmit */}
                  <Button
                    onClick={() => handleSubmit}
                    className="w-full"
                    size="sm"
                  >
                    Ingresar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
