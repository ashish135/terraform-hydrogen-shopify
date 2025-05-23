import {useEffect, useState} from 'react';
import sanityClient from '~/sanity/client';
import sanityImage from '~/sanity/ImageBuilder';
import {Link} from '@remix-run/react';

function formatComponentName(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function SanityHomepageModules() {
  const [homeModules, setHomeModules] = useState([]);
  const [components, setComponents] = useState({});
  const [heroComponent, setHeroComponent] = useState({});

  useEffect(() => {
    async function fetchAndLoadHomeModules() {
      try {
        const data = await sanityClient.fetch(
          '*[_type == "home"][0]{modules, hero}',
        );
        setHomeModules(data.modules || []);
        setHeroComponent(data.hero || {});

        const modules = import.meta.glob('./*.jsx');
        const loadedComponents = {};

        for (const module of data.modules || []) {
          const componentName = formatComponentName(module._type);
          const modulePath = `./${componentName}.jsx`;

          if (modules[modulePath]) {
            loadedComponents[module._type] = await modules[modulePath]()
              .then((mod) => mod.default)
              .catch((err) => {
                console.error(`Error loading component ${componentName}:`, err);
                return null;
              });
          }
        }
        setComponents(loadedComponents);
      } catch (error) {
        console.error(
          'Error fetching home modules or loading components:',
          error,
        );
      }
    }

    fetchAndLoadHomeModules();
  }, []);

  return (
    <div className="sanity-homepage-modules">
      <div className="hero">
        {heroComponent?.content ? (
          <img
            className="hero-image"
            src={sanityImage(heroComponent.content[0].image).url()}
          />
        ) : (
          <p>Loading...</p> // Or placeholder image
        )}

        <div className="hero-content">
          <h2 className="hero-title">{heroComponent.title}</h2>
          <p className="hero-subTitle">{heroComponent.description}</p>
          <Link className="hero-cta" to={heroComponent.href}>
            Shop Now →
          </Link>
        </div>
      </div>
      {homeModules.map((module, index) => {
        const Component = components[module._type];
        return Component ? (
          <Component key={index} moduleData={module} />
        ) : (
          <div key={index}>Unknown Module: {module._type}</div>
        );
      })}
    </div>
  );
}
