const openWishlistDrawer = () => {
    const event = new CustomEvent("openDrawer", { detail: "wishlist" });
    window.dispatchEvent(event);
  };
  
  export const OpenDrawerButton = () => {
    return (
      <button onClick={openWishlistDrawer} className="btn btn-primary">
        Open Wishlist
      </button>
    );
  };
  