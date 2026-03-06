import SignupForm from "./signup-form";

type SearchParams = {
  degree?: string;
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const degree = params.degree ?? "bachelor";

  return <SignupForm degree={degree} />;
}
