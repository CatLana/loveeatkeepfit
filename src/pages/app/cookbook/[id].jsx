import RecipePage from '../../../app/cookbook/[id]';
import { useRouter } from 'next/router';

export default function RecipePageWrapper() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return null;
  return <RecipePage id={id} />;
}
