import React, { useEffect, useRef, useState } from 'react';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);

    useEffect(() => {
        // WebSocket 연결 설정
        webSocket.current = new WebSocket('ws://localhost:8080/ws');

        webSocket.current.onopen = () => {
            console.log('WebSocket 연결!');
        };

        webSocket.current.onclose = (error) => {
            console.log('WebSocket 연결이 종료되었습니다.', error);
        };

        webSocket.current.onerror = (error) => {
            console.log('WebSocket 오류가 발생했습니다.', error);
        };

        webSocket.current.onmessage = (event) => {
            // 새로운 메시지를 이전 메시지 리스트에 추가
            setMessages((prev) => [...prev, event.data]);
        };

        // 컴포넌트 언마운트 시 WebSocket 연결 해제
        return () => {
            webSocket.current?.close();
        };
    }, []);

    const sendMessage = (message) => {
        if (webSocket.current?.readyState === WebSocket.OPEN) {
            webSocket.current.send(message);
        }
    };

    return (
        <div>
            <button onClick={() => sendMessage('Hello, Server!')}>메시지 전송</button>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
        </div>
    );
};

export default WebSocketComponent;