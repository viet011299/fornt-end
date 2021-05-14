import { createContext } from "react";
import socketio from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_URL_API
export const socket = socketio(SOCKET_URL);
export const SocketContext = createContext();