import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../management/user/Login";
import { fetchCollection } from "../../services/collectionAPI";
import Navbar from "./Navbar";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { swapCollectionIds } from "../../services/collectionAPI";
import LoadingSketch from "./LoadingSketch";
import "./Home.css";

const ItemType = "COLLECTION";

const DraggableCollection = ({ collection, index, moveCollection }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCollection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <Link
      ref={(node) => ref(drop(node))}
      className="image-container"
      to={`/collection/${collection.ID}`}
    >
      <div key={collection.id}>
        <img className="image" src={collection.Image} alt={collection.Name} />
      </div>
    </Link>
  );
};

const Home = () => {
  const { loggedIn } = useAuth(); // Get loggedIn state
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getCollections = async () => {
      const data = await fetchCollection();
      // Sort collections by Position before setting the state
      const sortedCollections = data.sort((a, b) => a.Position - b.Position);
      setCollections(sortedCollections);
      setLoading(false); // Set loading to false after data is fetched
    };
    getCollections();
  }, []);

  const moveCollection = async (fromIndex, toIndex) => {
    const updatedCollections = [...collections];
    const [movedCollection] = updatedCollections.splice(fromIndex, 1);
    updatedCollections.splice(toIndex, 0, movedCollection);

    setCollections(updatedCollections);

    try {
      console.log("Sending data to the server:", {
        firstPhotoId: updatedCollections[fromIndex].ID,
        secondPhotoId: updatedCollections[toIndex].ID,
      });

      // Assuming swapCollectionIds function works as expected
      const response = await swapCollectionIds(
        updatedCollections[fromIndex].ID,
        updatedCollections[toIndex].ID
      );

      if (!response.success) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error swapping collection IDs:", error);
      // Revert changes in case of an error
      const revertedCollections = [...updatedCollections];
      const [revertedCollection] = revertedCollections.splice(toIndex, 1);
      revertedCollections.splice(fromIndex, 0, revertedCollection);
      setCollections(revertedCollections);
    }
  };

  if (!loggedIn) {
    return null; // Render nothing if not logged in
  }

  if (loading) {
    return <LoadingSketch />;
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="home-container">
          <div className="w-c-container">
            {collections.map((collection, index) => (
              <DraggableCollection
                key={collection.ID}
                collection={collection}
                index={index}
                moveCollection={moveCollection}
              />
            ))}
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default Home;

{
  /* 
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      */
}

{
  /*     
      <div className="elements-container">
        <Link to="/experimentation">
          <img className="elementLink" src={element1} />
        </Link>
        <Link to="/experimentation-2">
          <img className="elementLink" src={element2} />
        </Link>
      </div>
      */
}
