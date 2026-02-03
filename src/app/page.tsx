import { redirect } from "next/navigation";

// La página principal ahora es directamente el evento BMA 2026
export default function Home() {
  redirect("/evento");
}
