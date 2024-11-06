import { useEffect, useState, useContext, useRef } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { format } from "timeago.js";

export default function Inbox() {
  const { currentUser } = useContext(AuthContext);
  const Conversation = useLoaderData();
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const defaultMessage = location.state?.defaultMessage || "";
  const [newMessageContent, setNewMessageContent] = useState(defaultMessage);
  const messageContainerRef = useRef(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});
  const dropdownRef = useRef(null);

  // Define friend based on Conversation and ensure friend is not undefined
  const friend =
    Conversation &&
    Conversation.user1 &&
    Conversation.user2 &&
    (Conversation.user1.id === currentUser.id
      ? Conversation.user2
      : Conversation.user1);
  // console.log(friend);

  useEffect(() => {
    setMessages(Conversation.messages);
  }, [Conversation]);

  // Scroll to the bottom of the message container whenever the messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageContent.trim()) return;

    try {
      const { data: newMessage } = await apiRequest.post(`/messages`, {
        content: newMessageContent,
        conversationId: Conversation.id,
        senderId: currentUser.id,
        receiverId: friend.id,
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessageContent(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const toggleDropdown = (messageId) => {
    setOpenDropdownId((prevId) => (prevId === messageId ? null : messageId));

    setTimeout(() => {
      const dropdown = dropdownRefs.current[messageId];
      if (dropdown) {
        const observer = new IntersectionObserver(
          (entries, observer) => {
            const entry = entries[0];

            // Check if the entire dropdown is not fully visible
            if (!entry.isIntersecting) {
              dropdown.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }

            observer.disconnect();
          },
          { threshold: 1.0 }
        ); // 1.0 means we want the entire element to be in view

        observer.observe(dropdown);
      }
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDeleteMessage = async (messageId) => {
    try {
      await apiRequest.delete(`/messages/${messageId}`);
      setOpenDropdownId(null);
    } catch (error) {
      console.error("Error deleting message", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Conversation Display Area */}

      {Conversation && friend ? (
        <div className="flex-1 flex flex-col min-h-screen bg-white dark:bg-black">
          <nav className="bg-[#F5EFFF] dark:bg-gray-900 px-4">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-3">
              <a
                href=""
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <div className="relative">
                  <img
                    className="w-12 h-12 rounded object-cover"
                    src={friend.avatar}
                    alt={friend.username}
                  />
                  <span className="absolute top-1 -right-2 transform -translate-y-1/2 w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
                <h6 className="text-lg font-bold  dark:text-white hover:underline">
                  {friend.username}
                </h6>
              </a>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 19 18"
              >
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
              </svg>
            </div>
          </nav>

          {/* Message Display Area */}
          <div
            ref={messageContainerRef}
            className="flex-1 overflow-y-auto p-4 px-8"
          >
            {messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id;
              const sender = isCurrentUser ? currentUser : friend;

              return (
                <div
                  key={message.id}
                  className={`flex items-start mb-4 ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar on the left for received messages */}
                  {!isCurrentUser && (
                    <img
                      className="w-10 h-10 rounded-full object-cover mr-3"
                      src={sender.avatar}
                      alt={sender.username}
                    />
                  )}

                  <div className="flex items-center space-x-2">
                    {isCurrentUser && (
                      <div className={`relative`}>
                        {/*  Dots and Dropdown Menu  */}
                        <button
                          onClick={() => toggleDropdown(message.id)}
                          id={`dropdownMenuIconButton_${message.id}`}
                          data-dropdown-toggle={`dropdownDots_${message.id}`}
                          data-dropdown-placement="bottom-start"
                          className="inline-flex self-center items-center p-1 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray=100 focus:ring-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
                          type="button"
                        >
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 4 15"
                          >
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                          </svg>
                        </button>
                        <div
                          ref={(el) => (dropdownRefs.current[message.id] = el)}
                          className={`absolute top-full mt-2 right-0 z-10 ${
                            openDropdownId === message.id ? "block" : "hidden"
                          } bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900`}
                        >
                          <ul
                            ref={dropdownRef}
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconButton"
                          >
                            {/* <li>
                              <button
                                onClick={() => {
                                  // Implement the forwarding logic here
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-300 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
                              >
                                Forward
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => {
                                  // Implement the copy logic here
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-300 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
                              >
                                Copy
                              </button>
                            </li> */}
                            <li>
                              <button
                                onClick={() => handleDeleteMessage(message.id)} // Call delete function
                                className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-300 hover:text-red-500 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    <div>
                      {!isCurrentUser && (
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          {sender.username}
                        </div>
                      )}
                      <div
                        className={`inline-block max-w-lg p-3 rounded-lg ${
                          isCurrentUser
                            ? "bg-[#A594F9] text-black"
                            : "bg-[#F5EFFF] text-black"
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>

                      <span className="text-xs mt-1 block text-gray-500">
                        {format(message.createdAt)}
                      </span>
                    </div>

                    {/* Dropdown for user that is not logged in user */}
                  </div>

                  {/* Avatar on the right for sent messages */}
                  {isCurrentUser && (
                    <img
                      className="w-10 h-10 rounded-full object-cover ml-3"
                      src={sender.avatar}
                      alt={sender.username}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Message input form */}
          <form
            onSubmit={handleSendMessage}
            className="p-2 px-4 pb-16 bg-[#F5EFFF] dark:bg-gray-900"
          >
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-200 dark:bg-black">
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                  />
                </svg>
                <span className="sr-only">Add emoji</span>
              </button>
              <textarea
                id="chat"
                rows="2"
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-900 placeholder-gray-900 focus:ring-blue-500 focus:border-blue-900 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type a message..."
                value={newMessageContent}
                onChange={(e) => setNewMessageContent(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-blue-400 dark:text-green-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="p-4 border-2 border-gray-500 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <h1 className="text-2xl text-center font-extrabold dark:text-gray-100">
              Select a friend to start a conversation
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

//  {/* Dropdown for user that is not logged in user */}
//  {!isCurrentUser && (
//   <div className={`relative `}>
//     {/* Dots and Dropdown Menu */}
//     <button
//       onClick={() => toggleDropdown(message.id)}
//       id={`dropdownMenuIconButton_${message.id}`}
//       data-dropdown-toggle={`dropdownDots_${message.id}`}
//       data-dropdown-placement="bottom-start"
//       className="inline-flex self-center items-center p-1 text-sm font-medium text-center text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray=100 focus:ring-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
//       type="button"
//     >
//       <svg
//         className="w-4 h-4 text-gray-500 dark:text-gray-400"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 4 15"
//       >
//         <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
//       </svg>
//     </button>
//     <div
//       ref={(el) => (dropdownRefs.current[message.id] = el)}
//       className={`absolute top-full mt-2 left-0 z-10 ${
//         openDropdownId === message.id ? "block" : "hidden"
//       } bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900`}
//     >
//       <ul
//         ref={dropdownRef}
//         className="py-2 text-sm text-gray-700 dark:text-gray-200"
//         aria-labelledby="dropdownMenuIconButton"
//       >
//         <li>
//           <button
//             onClick={() => {
//               // Implement the reply logic here
//             }}
//             className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-300 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
//           >
//             Reply
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => {
//               // Implement the forwarding logic here
//             }}
//             className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-300 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
//           >
//             Forward
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => {
//               // Implement the copy logic here
//             }}
//             className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-300 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
//           >
//             Copy
//           </button>
//         </li>
//       </ul>
//     </div>
//   </div>
// )}
