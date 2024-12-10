export default function DescriptionTab ({description,charactersLength=''}) {

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
    return (
      <div
        role="tabpanel"
        id="react-aria5632747685-1-tabpane-productDescription"
        aria-labelledby="react-aria5632747685-1-tab-productDescription"
        className="fade tab-pane active show"
      >
        <div className="text-black leading-relaxed md:p-8 py-1 text-sm leading-6 font-medium"
        
        dangerouslySetInnerHTML={{
            __html: descriptionRender(description?.html),
          }}
        
        >
        
        </div>
      </div>
    );
  };
  