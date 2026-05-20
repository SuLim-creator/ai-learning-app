import { MatrixGridDiagram } from "./matrix-grid";
import { SupervisedFlowDiagram } from "./supervised-flow";
import { LossCurveDiagram } from "./loss-curve";
import { GradientDescentBallDiagram } from "./gradient-descent-ball";
import { OverfittingCurvesDiagram } from "./overfitting-curves";
import { NeuralNetworkLayersDiagram } from "./neural-network-layers";
import { ForwardBackwardPassDiagram } from "./forward-backward-pass";
import { CnnFilterDiagram } from "./cnn-filter";
import { AttentionMapDiagram } from "./attention-map";
import { ActivationFunctionsDiagram } from "./activation-functions";

export {
  MatrixGridDiagram,
  SupervisedFlowDiagram,
  LossCurveDiagram,
  GradientDescentBallDiagram,
  OverfittingCurvesDiagram,
  NeuralNetworkLayersDiagram,
  ForwardBackwardPassDiagram,
  CnnFilterDiagram,
  AttentionMapDiagram,
  ActivationFunctionsDiagram,
};

export const DIAGRAM_COMPONENTS: Record<string, React.ComponentType> = {
  "matrix-grid": MatrixGridDiagram,
  "supervised-flow": SupervisedFlowDiagram,
  "loss-curve": LossCurveDiagram,
  "gradient-descent-ball": GradientDescentBallDiagram,
  "overfitting-curves": OverfittingCurvesDiagram,
  "neural-network-layers": NeuralNetworkLayersDiagram,
  "forward-backward-pass": ForwardBackwardPassDiagram,
  "cnn-filter": CnnFilterDiagram,
  "attention-map": AttentionMapDiagram,
  "activation-functions": ActivationFunctionsDiagram,
};
