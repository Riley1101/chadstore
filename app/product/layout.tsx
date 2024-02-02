export default function DetailPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto py-12">{children}</div>;
}
