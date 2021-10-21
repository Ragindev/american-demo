import React from 'react';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwlCarousel from '@components/features/owl-carousel';
import ALink from '@components/features/custom-link';
import ProductTwo from '@components/features/product/product-two';

import { saleSlider } from '@utils/data/carousel';
import { fadeIn } from '@utils/data/keyframes';

function SaleCollection( props ) {
    const { products, loading } = props;

    return (
        <Reveal keyframes={ fadeIn } delay={ 600 } duration={ 1200 } triggerOnce>
            <section className="sales-section container mt-10 pt-2">
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-6">
                        <h2 className="title title-simple text-left">On sale this week’s</h2>
                        <div className="banner banner-fixed" style={ { backgroundColor: "#333" } }>
                            <figure>
                                <LazyLoadImage src="./images/home/banners/1.jpg" effect="opacity" alt="banner" width="380" height="286" />
                            </figure>
                            <div className="banner-content text-center x-50 y-50">
                                <h3 className="banner-title text-white font-weight-bold">Black Friday Sale</h3>
                                <h4 className="banner-subtitle text-white text-uppercase font-weight-bold">Up TO <span
                                    className="text-primary font-weight-bolder">70% Off</span>
                                </h4>
                                <p className="mb-5 text-white text-uppercase">Everything</p>
                                <ALink href="/shop" className="btn btn-outline btn-white btn-md">Shop now</ALink>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-6 order-md-first mb-6">
                        <h2 className="title title-simple text-left mb-5">Our Sale Offer</h2>

                        {
                            loading ?
                                <OwlCarousel adClass="owl-theme owl-nav-full" options={ saleSlider }>
                                    {
                                        [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                            <div className="product-loading-overlay" key={ 'sale-skel-' + item }></div>
                                        )
                                    }
                                </OwlCarousel>
                                :
                                <OwlCarousel adClass="owl-theme owl-nav-full" options={ saleSlider }>
                                    {
                                        products && products.map( ( item, index ) =>
                                            <ProductTwo
                                                isCategory={ false }
                                                product={ item }
                                                key={ `sale-product-${ index }` } />
                                        )
                                    }
                                </OwlCarousel>
                        }
                    </div>
                </div>
            </section>
        </Reveal>
    )
}

export default React.memo( SaleCollection );
