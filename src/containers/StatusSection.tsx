import React from "react";
import useFPS from "../hooks/useFPS";
import StatusSection from "../components/StatusSection";
import GameStore from "../state/GameStore";

const StatusContainer: React.FC = () => {
    const [game] = React.useContext(GameStore);
    const fps = useFPS();

    return <StatusSection fps={fps} level={game.score} lines={game.lineCount} />
}

export default StatusContainer;