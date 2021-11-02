import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import IntroSection from '@components/partials/home/intro-section'
import { Grid, Marquee, Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import CategorySection from '@components/partials/home/category-section'
import BestCollection from '@components/partials/home/best-collection'
import PromoSection from '@components/partials/home/promo-section'
import IntroSectionTwo from '@components/partials/home/intro-section-two'
import SliceZone from '@components/prismic/SliceZone'
import { Client } from '@utils/prismicHelpers'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  const client = Client()

  // const doc = await client.getSingle('american_tourister', {}) || {}
  // get homepage of american tourister by ID
  const homePage = (await client.getByID('YW6FtBIAAJvfAdDu', {})) || {}

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      homePage,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
  homePage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <IntroSection />

      <IntroSectionTwo banners={homePage.data.homepage_banner} />

      <SliceZone sliceZone={homePage.data.body} />

      <BestCollection products={products} loading={false} />
      <CategorySection />
      <PromoSection />

      {/* <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid> */}
      {/* <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      {/* <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      /> */}
      {/* <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid> */}
      {/* <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
