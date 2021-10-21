import React from 'react';
import Reveal from 'react-awesome-reveal';

import ProductTwo from '@components/features/product/product-two';

import { fadeIn } from '@utils/data/keyframes';

function BestCollection( props ) {
    const { products, loading } = props;

    return (
        <section className="mt-10 pt-3 mb-6">
        <h2 className="title title-simple title-center ls-m">Best Selling</h2>

        <Reveal keyframes={ fadeIn } triggerOnce>
            {
                loading ?
                    <div className="product-wrapper row">
                        {
                            [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( ( item ) =>
                                <div
                                    className="product-loading-overlay col-lg-3 col-md-4 col-6 mb-4"
                                    key={ 'best-selling-skel-' + item }>
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className="product-wrapper row">
                        {
                            products && products.map( item =>
                                <div
                                    className="col-lg-3 col-md-4 col-6 mb-4"
                                    key={ 'best-selling-' + item.name }>
                                    <ProductTwo product={ item } adClass="text-left" />
                                </div>
                            )
                        }
                    </div>
            }
        </Reveal>
    </section>
    )
}

export default React.memo( BestCollection );
