import { useState, useEffect } from "react";
import { useModal } from "hooks/useModal";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import imageApi from "../api/api";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import Loader from "./Loader/Loader";


export const App = () => {
  const [searchQuery, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImageURL, setlargeImageURL] = useState('');
  const [imgTags, setImgTags] = useState(null)
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  const {showModal, toggle} = useModal()
  
  useEffect(() => {
    if (!searchQuery && page === 1) {
      return;
    }
    imageApi({searchQuery, page })
      .then(({ hits, totalHits }) => {
        setImages(prevState => [...prevState, ...hits]);
        setTotalHits(totalHits);

      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  }, [searchQuery, page]);

  const handleSubmitForm = query => {
    if ( searchQuery === query) {
      return;
    }
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const setImgInfo = ( {largeImageURL, tags }) => {
    setlargeImageURL(largeImageURL);
    setImgTags(tags)
  };
  
  const isNoLoading = () => setIsLoading(true);


    return (      
    <div className="container">
        <Searchbar onSubmit={handleSubmitForm} isLoading={isLoading}/>
        {error && <p>Whoops, something went wrong.</p>}
        
        <ImageGallery
          images={images}
          openModal={toggle}
          onSetImgInfo={setImgInfo}
        />

        {isLoading && <Loader /> }
        {images.length > 0 && isNoLoading && totalHits > images.length &&(
          <Button onLoadMore={loadMore} />
        )}
        
        {showModal && (
          <Modal onClose={toggle}>            
            <img src={largeImageURL} alt={imgTags} />
          </Modal>
        )}
    </div>
  );
  }

