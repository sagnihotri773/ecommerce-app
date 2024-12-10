import { useTranslations } from 'next-intl';
import React from 'react'

export default function ProductsDescription({ description, charactersLength = '' }) {

  const descriptionRender = (value = '') => {
    const unescapedHtml = value
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');

    const limitedText = charactersLength && unescapedHtml.length > charactersLength
      ? unescapedHtml.slice(0, charactersLength) + '...'
      : unescapedHtml;

    return limitedText
  }

  const t = useTranslations("ProductDetail")

  return (

    description?.html.length ?
      <div>
        <div className="text-slate-400 mt-2">
          <div
            dangerouslySetInnerHTML={{
              __html: descriptionRender(description?.html),
            }}
          />
        </div>
      </div> : ''
  )
}
