import React from 'react';
import Reveal from 'react-awesome-reveal';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import OwlCarousel from '@components/features/owl-carousel';
import ProductNine from '@components/features/product/product-nine';

import { specialSlider } from '@utils/data/carousel';
import { fadeIn } from '@utils/data/keyframes';

function SpecialCollection( props ) {
    const { featured, latest, bestSelling, loading } = props;

    return (
        <Reveal keyframes={ fadeIn } triggerOnce>
            <section className="products-wrapper container pt-5 mt-10 pb-4">
                <div className="tab tab-nav-simple tab-nav-center">
                    <Tabs selectedTabClassName="show" selectedTabPanelClassName="active" defaultIndex={ 0 }>
                        <TabList className="nav nav-tabs">
                            <Tab className="nav-item">
                                <span className="nav-link" href="#featured">Featured</span>
                            </Tab>
                            <Tab className="nav-item">
                                <span className="nav-link" href="#new-arrivals">New Arrivals</span>
                            </Tab>
                            <Tab className="nav-item">
                                <span className="nav-link" href="#best-sellers">Best Sellers</span>
                            </Tab>
                        </TabList>

                        <div className="tab-content">
                            <TabPanel className="tab-pane">
                                {
                                    loading ?
                                        <OwlCarousel adClass="owl-theme" options={ specialSlider }>
                                            {
                                                [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                                    <div className="product-loading-overlay" key={ 'featured-skel-' + item }></div>
                                                )
                                            }
                                        </OwlCarousel>
                                        :
                                        <OwlCarousel adClass="owl-theme" options={ specialSlider }>
                                            {
                                                featured && featured.map( ( item, index ) =>
                                                    <ProductNine
                                                        product={ item }
                                                        key={ `featured-product-${ index }` } />
                                                )
                                            }
                                        </OwlCarousel>
                                }
                            </TabPanel>

                            <TabPanel className="tab-pane">
                                {
                                    loading ?
                                        <OwlCarousel adClass="owl-theme" options={ specialSlider }>
                                            {
                                                [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                                    <div className="product-loading-overlay" key={ 'latest-skel-' + item }></div>
                                                )
                                            }
                                        </OwlCarousel>
                                        :
                                        <OwlCarousel adClass="owl-theme" options={ specialSlider }>
                                            {
                                                latest && latest.map( ( item, index ) =>
                                                    <ProductNine
                                                        product={ item }
                                                        key={ `latest-product-${ index }` } />
                                                )
                                            }
                                        </OwlCarousel>
                                }
                            </TabPanel>

                            <TabPanel className="tab-pane">
                                {
                                    loading ?
                                        <OwlCarousel adClass="owl-theme" options={ specialSlider }>
                                            {
                                                [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                                    <div className="product-loading-overlay" key={ 'best-skel-' + item }></div>
                                                )
                                            }
                                        </OwlCarousel>
                                        :
                                        <OwlCarousel adClass="owl-theme" options={ specialSlider }>
                                            {
                                                bestSelling && bestSelling.map( ( item, index ) =>
                                                    <ProductNine
                                                        product={ item }
                                                        key={ `best-product-${ index }` } />
                                                )
                                            }
                                        </OwlCarousel>
                                }
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </section>
        </Reveal>
    )
}

export default React.memo( SpecialCollection );
