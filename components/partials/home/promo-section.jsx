import Reveal from 'react-awesome-reveal';

import { fadeIn, fadeInUpShorter } from '@utils/data/keyframes';

export default function PromoSection() {
    return (
        <Reveal keyframes={ fadeIn } triggerOnce>
            <section className="banner banner-sale mt-10 mb-10"
                style={ { backgroundImage: `url(https://unsplash.com/photos/PpzBE1hWeGI)`, backgroundColor: "#1f272b" } }>
                <Reveal keyframes={ fadeInUpShorter } duration={ 1000 } triggerOnce>
                    <div className="banner-content">
                        <h4 className="banner-subtitle text-uppercase text-white font-weight-normal lh-1 ls-m mb-0">End
                    Of Season</h4>
                        <hr className="divider mb-2" />
                        <h3 className="banner-title text-uppercase text-white lh-1 mb-0">Sale</h3>
                        <div className="banner-price-info d-flex align-items-center justify-content-center">
                            <h5 className="text-uppercase text-white ls-l mb-0">At Up To<br /><span
                                className="text-secondary ls-l">50%</span> Off</h5>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Reveal>
    )
}