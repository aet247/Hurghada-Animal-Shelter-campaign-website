import { parseFrontmatter } from '../parseFrontmatter'

export interface Animal {
  slug:     string
  name:     string
  age:      string
  gender:   string
  rescued:  string
  photo:    string
  story:    string
  needs:    string
}

// Vite glob import — raw string content of all animal markdown files
const animalModules = import.meta.glob('/content/animals/*.md', {
  eager:  true,
  query:  '?raw',
  import: 'default',
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace('.md', '') ?? ''
}

export function loadAnimals(): Animal[] {
  return Object.entries(animalModules)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw)
      return {
        slug:    slugFromPath(path),
        name:    data.name    ?? 'Unknown',
        age:     data.age     ?? '',
        gender:  data.gender  ?? '',
        rescued: data.rescued ?? '',
        photo:   data.photo   ?? '',
        story:   content,
        needs:   data.needs   ?? '',
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function loadAnimalBySlug(slug: string): Animal | undefined {
  return loadAnimals().find(a => a.slug === slug)
}
