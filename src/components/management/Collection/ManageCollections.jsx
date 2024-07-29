import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../user/Login";
import { fetchCollection } from "../../../services/collectionAPI";
import Navbar from "../../layout/Navbar";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { swapCollectionIds } from "../../../services/collectionAPI";
import LoadingSketch from "../../layout/LoadingSketch";
import "../../layout/Home.css";

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

const ManageCollections = () => {
  const { loggedIn } = useAuth(); // Get loggedIn state
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getCollections = async () => {
      const data = await fetchCollection();
      const sortedCollections = data.sort((a, b) => a.Position - b.Position);
      setCollections(sortedCollections);
      setLoading(false); 
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
    return null; 
  }

  if (loading) {
    return <LoadingSketch />;
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="home-container">
          <p className="title">REARRANGE COLLECTION DISPLAY POSITIONS USING DRAG AND DROP</p>
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

export default ManageCollections;
