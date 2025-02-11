import FloatingNavBar from "@/src/components/molecules/NavBar";

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <FloatingNavBar />
    </div>
  );
}
