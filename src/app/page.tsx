import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { resolve } from 'path'

interface Recipe {
  title: string,
  image: string,
  time: number,
  description: string,
  vegan: boolean,
  id: string
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes')

  //delay
  await new Promise((resolve) => setTimeout(resolve, 3000))
  
  return result.json()
}

export default async function Home() {
  const recipes = await getRecipes()
  return (
    <main>
       <div className="grid grid-cols-3 gap-8">
        {recipes.map(recipe => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage alt='recipe image'/>
                <AvatarFallback>
                  {recipe.title.slice(0,2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.time} mins to cook.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="secondary">View Recipe</Button>
              {recipe.vegan && <Badge>Vegan!</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
