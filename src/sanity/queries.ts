export const menuSectionsQuery = `*[_type == "menuSection"] | order(orderRank asc) {
  "id": id.current,
  titleFr,
  titleEn,
  "items": *[_type == "menuItem" && section._ref == ^._id] | order(orderRank asc) {
    _id,
    nameFr, nameEn,
    descriptionFr, descriptionEn,
    price,
    "image": image.asset->url,
    dietary,
    available
  }
}`

export type SanityMenuSection = {
  id: string
  titleFr: string
  titleEn: string
  items: Array<{
    _id: string
    nameFr: string
    nameEn: string
    descriptionFr?: string
    descriptionEn?: string
    price: number
    image?: string
    dietary?: string[]
    available: boolean
  }>
}
