import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
//import { mainSlider17 } from '@utils/data/carousel';
import { useRouter } from 'next/router'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import MediaOne from '@components/partials/product/media/media-one';
import DetailOne from '@components/partials/product/detail/detail-one';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
//import Helmet from 'react-helmet';
//import imagesLoaded from 'imagesloaded';
//import OwlCarousel from '@components/features/owl-carousel';
// import DescOne from '@components/partials/product/desc/desc-one';
// import RelatedProducts from '@components/partials/product/related-products';



export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const productPromise = commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  const allProductsPromise = commerce.getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const { product } = await productPromise
  const { products: relatedProducts } = await allProductsPromise

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      product,
      relatedProducts,
      categories,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product: any) => {
            arr.push(`/${locale}/product${product.path}`)
          })
          return arr
        }, [])
      : products.map((product: any) => `/product${product.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
  relatedProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
 

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <div className="col-md-6 sticky-sidebar-wrapper">
        
    {/* <MediaOne product={ product } /> */}
    </div>
    <div className="col-md-6">
    <DetailOne product={ product } />
    </div>

    <ProductView product={product} relatedProducts={relatedProducts} />
    </div>
  )
}

Slug.Layout = Layout
