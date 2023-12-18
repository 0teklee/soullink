import Link from "next/link";
import Title from "@/components/common/module/Title";

export default async function NotFound() {
  return (
    <div className={`flex flex-col items-start gap-2`}>
      <Title size={`h1`} text={`Page Not Found`} />
      <p>Could not find requested resource</p>
      <Link href="/">Go back to main page</Link>
    </div>
  );
}
