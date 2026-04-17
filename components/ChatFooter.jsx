/**
 * Renders the footer of the chat window.
 * Includes input field, emoji picker, attachment button, typing indicator,
 * and other UI elements related to composing and sending messages.
 */
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { useScreenSize } from "@/context/screenSizeContext";
import { db } from "@/firebase/firebase";
import compressImage from "@/utils/image_compress";
import { GiphyFetch } from "@giphy/js-fetch-api";
import EmojiPicker from "emoji-picker-react";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { CgAttachment } from "react-icons/cg";
import { CiCreditCard1 } from "react-icons/ci";
import { FaFilePdf } from "react-icons/fa6";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoClose, IoEllipsisVerticalSharp, IoLocationOutline } from "react-icons/io5";
import { MdDeleteForever, MdGif } from "react-icons/md";
import { toast } from 'react-toastify';
import { FixedSizeGrid as Grid } from "react-window";
import { v4 as uuid } from "uuid";
import Composebar from "./Composebar";
import Icon from "./Icon";
import ToastMessage from "./ToastMessage";
import MapPopup from "./popup/MapPopup";
import SendMoneyPopup from "./popup/SendMoneyPopup";



const giphyApiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
const gf = giphyApiKey ? new GiphyFetch(giphyApiKey) : null;

const ChatFooter = () => {
  const [showImojiPicker, setShowImojiPicker] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState("");
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const fileInputRef = useRef(null);
  const [mapURL, setMapURL] = useState("");
  const [openMapPopup, setOpenMapPopup] = useState(false);
  const { currentUser } = useAuth();
  const { isSmallScreen, showAttachmentMenu, setShowAttachmentMenu } = useScreenSize();

  const {
    inputText,
    setInputText,
    data,
    editMsg,
    setEditMsg,
    isTyping,
    setAttachment,
    attachment,
    selectedFile,
    setSelectedFile,
    selectedGif,
    setSelectedGif
  } = useChatContext();

  useEffect(() => {
    setInputText(editMsg?.text || "");
  }, [editMsg]);

  const onEmojiClick = (emojiData, event) => {
    let text = inputText;
    setInputText((text += emojiData.emoji));
  };

  /**
   * Handles file change event from file input.
   * Gets the first file from the input files array.
   * Sets attachment state to the file.
   * If file exists, generates blob URL for preview.
   * Sets attachmentPreview state to the blob URL.
   */
  const onFileChange = async (e) => {
    let file = e.target.files[0];
    if (!file) {
      // console.log("No file selected");
      return;
    }

    // Print the file size in MB
    let fileSizeInMB = file.size / (1024 * 1024);
    // console.log(`File size: ${fileSizeInMB.toFixed(2)} MB`);
    if (fileSizeInMB > 10) {
      toast.error("File size should be less than 10MB");
    }

    // Check if the file is an image and compress it
    if (file.type.startsWith('image/')) {
      try {
        file = await compressImage(file);
      } catch (error) {
        // console.error('Failed to compress image', error);
      }
    }

    setAttachment(file);
    // Print the file size in MB
    fileSizeInMB = file.size / (1024 * 1024);
    // console.log(`File size: ${fileSizeInMB.toFixed(2)} MB`);

    if (file) {
      setShowAttachmentMenu(false);
      setSelectedFileType(file.type);
      const blobUrl = URL.createObjectURL(file);
      setSelectedFile(blobUrl);
    } else {
      setSelectedFileType("");
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    const fetchGifs = async () => {
      if (!gf) {
        toast.error("GIF search is unavailable. Add NEXT_PUBLIC_GIPHY_API_KEY.");
        return;
      }

      try {
        const { data } = await gf.trending({ limit: 50 });
        setGifs(data);
      } catch (error) {
        toast.error("Unable to load GIFs right now.");
      }
    };

    if (showGifPicker) {
      fetchGifs();
    }
  }, [showGifPicker]);

  const onGifSelected = (gif) => {
    setSelectedGif(gif.images.fixed_height_small.url);
    setShowGifPicker(false);
  };

  const fetchGifs = async (query) => {
    if (!gf) {
      return;
    }

    try {
      const { data } = await gf.search(query, { limit: 50 });
      setGifs(data);
    } catch (error) {
      toast.error("Unable to search GIFs right now.");
    }
  };

  const shareLocation = () => {
    setShowAttachmentMenu(false);

    // Check if the browser supports geolocation
    if ("geolocation" in navigator) {


      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const mapURL = `https://www.google.com/maps?q=${latitude},${longitude}`;

          // Update Firestore document with the location data
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: "",
              sender: currentUser.uid,
              fileUrl: mapURL,
              mapURL: mapURL,
              date: Timestamp.now(),
              read: false,
            }),
          });
        },
        (error) => {
          // console.error("Error getting user location:", error.message);
        }
      );

    } else {
      // console.error("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="flex items-center bg-c1/[0.5] p-2 rounded-xl relative">
      <ToastMessage />
      {openMapPopup && <MapPopup setOpenMapPopup={setOpenMapPopup} mapURL={mapURL} shareLocation={shareLocation} />}

      {openPopup && <SendMoneyPopup setOpenPopup={setOpenPopup} />}

      {/* Renders a preview of the selected file.
            Allows deselecting the file. */}
      {selectedFile && (
        <div className="absolute w-[100px] h-[100px] bottom-16 left-5 bg-c1 p-2 rounded-md">
          {selectedFileType.startsWith("image") && (
            <img
              src={selectedFile}
              className="w-full h-full object-contain object-center"
            />
          )}
          {selectedFileType.startsWith("video") && (
            <video
              src={selectedFile}
              controls
              className="w-full h-full object-contain object-center"
            />
          )}
          {selectedFileType.startsWith("audio") && (
            <audio
              src={selectedFile}
              controls
              className="w-full h-full object-contain object-center"
            />
          )}
          {selectedFileType.includes("pdf") && (
            <div className="h-full flex flex-col gap-2 items-center justify-center">
              <FaFilePdf size={27} className="text-gray-300" />
              <p className="text-[10px] font-light text-gray-300 text-wrap w-[96%] h-auto break-all text-center">
                {attachment?.name}</p>
            </div>
          )}
          <div
            className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center absolute -right-2 -top-2 cursor-pointer"
            onClick={() => {
              setAttachment(null);
              setSelectedFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
          >
            <MdDeleteForever size={14} />
          </div>
        </div>
      )}

      {/* Renders a preview of the selected GIF.
            Allows deselecting the GIF. */}
      {selectedGif && (
        <div className="absolute w-[100px] h-[100px] bottom-16 left-5 bg-c1 p-2 rounded-md">
          <img
            src={selectedGif}
            className="w-full h-full object-contain object-center"
          />
          <div
            className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center absolute -right-2 -top-2 cursor-pointer"
            onClick={() => setSelectedGif(null)}
          >
            <MdDeleteForever size={14} />
          </div>
        </div>
      )}

      {/* Renders a file upload input that allows the user to attach files,
            hidden behind a button with attachment icon.
            Triggers the onFileChange handler when a file is selected. */}

      {isSmallScreen ? (<>
        <Icon
          size="large"
          className={`${showAttachmentMenu ? "bg-c1" : ""}`}
          onClick={() => setShowAttachmentMenu(prev => !prev)}
          icon={<IoEllipsisVerticalSharp size={20} className="text-c3" />}
        />

        <div
          className={`absolute bottom-[110%] left-6 w-auto h-auto p-3 border border-black rounded-t-xl rounded-br-xl flex gap-3 items-center text-white bg-c1 ${showAttachmentMenu ? "" : "hidden"}`}
        >
          <div className="shrink-0">
            <input
              type="file"
              id="fileUploader"
              className="hidden"
              ref={fileInputRef}
              onChange={onFileChange}
            />

            <label htmlFor="fileUploader">
              <Icon
                size="large"
                icon={<CgAttachment size={25} className="text-white" />}
              />
            </label>
          </div>

          <div className="shrink-0 relative">
            <Icon
              size="large"
              className={`${showImojiPicker ? "bg-c1" : ""}`}
              icon={<HiOutlineEmojiHappy size={28} className="text-white" />}
              onClick={() => setShowImojiPicker(true)}
            />
            {showImojiPicker && (
              <ClickAwayListener onClickAway={() => setShowImojiPicker(false)}>
                <div className="absolute bottom-12 -left-8 shadow-lg">
                  <EmojiPicker
                    emojiStyle="native"
                    theme="light"
                    height={400}
                    width={300}
                    onEmojiClick={onEmojiClick}
                    autoFocusSearch={false}
                  />
                </div>
              </ClickAwayListener>
            )}
          </div>

          <div className="shrink-0 relative">
            <Icon
              size="large"
              className={`${showGifPicker ? "bg-c1" : ""}`}
              icon={<MdGif size={35} className="text-white" />}
              onClick={() => setShowGifPicker(true)}
            />
            {showGifPicker && (
              <ClickAwayListener onClickAway={() => setShowGifPicker(false)}>
                <div className="absolute bottom-12 -left-20 shadow-lg bg-white p-4 rounded-md">
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded-md p-2 w-full mb-4 text-black"
                    placeholder="Search for GIFs"
                    onChange={(e) => fetchGifs(e.target.value)}
                  />
                  <Grid
                    columnCount={3}
                    columnWidth={100}
                    height={200}
                    rowCount={Math.ceil(gifs.length / 3)}
                    rowHeight={100}
                    width={280}
                  >
                    {({ columnIndex, rowIndex, style }) => {
                      const gif = gifs[rowIndex * 3 + columnIndex];
                      return gif ? (
                        <img
                          src={gif.images.fixed_height_small.url}
                          style={style}
                          onClick={() => {
                            onGifSelected(gif);
                            setShowAttachmentMenu(false);
                          }}
                          alt={gif.title}
                        />
                      ) : null;
                    }}
                  </Grid>
                </div>
              </ClickAwayListener>
            )}
          </div>

          <div onClick={() => {
            setOpenPopup(true);
            setShowAttachmentMenu(false);
          }}>
            <Icon
              size="large"
              icon={<CiCreditCard1 size={28} className="text-white" />}
            />
          </div>

          <div onClick={() => setOpenMapPopup(true)}>
            <Icon
              size="large"
              icon={<IoLocationOutline size={28} className="text-white" />}
            />
          </div>
        </div>
      </>) : (
        <>
          <div className="shrink-0">
            <input
              type="file"
              id="fileUploader"
              className="hidden"
              ref={fileInputRef}
              onChange={onFileChange}
            />

            <label htmlFor="fileUploader">
              <Icon
                size="large"
                icon={<CgAttachment size={20} className="text-c3" />}
              />
            </label>
          </div>

          <div className="shrink-0 relative">
            <Icon
              size="large"
              className={`${showImojiPicker ? "bg-c1" : ""}`}
              icon={<HiOutlineEmojiHappy size={24} className="text-c3" />}
              onClick={() => setShowImojiPicker(true)}
            />
            {showImojiPicker && (
              <ClickAwayListener onClickAway={() => setShowImojiPicker(false)}>
                <div className="absolute bottom-12 left-0 shadow-lg">
                  <EmojiPicker
                    emojiStyle="native"
                    theme="light"
                    onEmojiClick={onEmojiClick}
                    autoFocusSearch={false}
                  />
                </div>
              </ClickAwayListener>
            )}
          </div>

          <div className="shrink-0 relative">
            <Icon
              size="large"
              className={`${showGifPicker ? "bg-c1" : ""}`}
              icon={<MdGif size={25} className="text-c3" />}
              onClick={() => setShowGifPicker(true)}
            />
            {showGifPicker && (
              <ClickAwayListener onClickAway={() => setShowGifPicker(false)}>
                <div className="absolute bottom-12 left-0 shadow-lg bg-white p-4 rounded-md">
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded-md p-2 w-full mb-4 text-black"
                    placeholder="Search for GIFs"
                    onChange={(e) => fetchGifs(e.target.value)}
                  />
                  <Grid
                    columnCount={3}
                    columnWidth={100}
                    height={300}
                    rowCount={Math.ceil(gifs.length / 3)}
                    rowHeight={100}
                    width={300}
                  >
                    {({ columnIndex, rowIndex, style }) => {
                      const gif = gifs[rowIndex * 3 + columnIndex];
                      return gif ? (
                        <img
                          src={gif.images.fixed_height_small.url}
                          style={style}
                          onClick={() => onGifSelected(gif)}
                          alt={gif.title}
                        />
                      ) : null;
                    }}
                  </Grid>
                </div>
              </ClickAwayListener>
            )}
          </div>

          <div onClick={() => setOpenPopup(true)}>
            <Icon
              size="large"
              icon={<CiCreditCard1 size={23} className="text-c3" />}
            />
          </div>

          <div onClick={() => setOpenMapPopup(true)}>
            <Icon
              size="large"
              icon={<IoLocationOutline size={23} className="text-c3" />}
            />
          </div>
        </>
      )}

      {/* Conditionally renders a typing indicator
            if another user is typing in the chat.

            Shows the other user's name and a typing icon.
            Positioned absolutely to overlay the chat messages. */}
      {isTyping && (
        <div className="absolute -top-6 left-4 bg-c2 w-full h-6">
          <div className="flex gap-2 w-full h-full opacity-50 text-sm text-white">
            {`${data.user.displayName} is typing`}
            <img src="/typing.svg" />
          </div>
        </div>
      )}

      {/* Conditionally renders a cancel edit button when a message is being edited.
            Allows the user to cancel editing the message and dismiss the edit UI.

            @param {Object | null} editMsg - The message being edited.
            @param {Function} setEditMsg - Callback to set editing message to null. */}
      {editMsg && (
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-c4 flex items-center gap-2 py-2 px-4 pr-2 rounded-full text-sm font-semibold cursor-pointer shadow-lg"
          onClick={() => setEditMsg(null)}
        >
          <span>Cancel edit</span>
          <IoClose size={20} className="text-white" />
        </div>
      )}

      <Composebar
        selectedFileType={selectedFileType}
        setSelectedFile={setSelectedFile}
        setSelectedGif={setSelectedGif}
        selectedGif={selectedGif}
        setShowAttachmentMenu={setShowAttachmentMenu}
      />
    </div>
  );
};

export default ChatFooter;
