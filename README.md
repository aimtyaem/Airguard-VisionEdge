# Airguard VisionEdge
![logo](img/logo.gif)
**Airguard VisionEdge** is a concept for an advanced system that enables environmental researchers and on-site analysts to detect, visualize, and interpret greenhouse gas (GHG) anomalies in near-real-time using a fusion of Edge AI and satellite data.

## 🌍 Concept Summary

**Purpose:** To enable environmental researchers and on-site analysts to detect, visualize, and interpret greenhouse gas (GHG) anomalies in near-real-time using Edge AI + satellite fusion.

## System Architecture

The system is designed with three core layers:

1.  **Edge Impulse Node:**
    * Runs optimized Machine Learning models (TinyML) for local emission pattern detection.
    * Performs inference on satellite raster tiles and ground sensor data (e.g., $CO_2$, $PM2.5$).

2.  **Web Dashboard (Android-first):**
    * Displays fused insights through interactive maps, charts, and anomaly markers.
    * Syncs with Google Colab notebooks for advanced analytics and deep-dive visualization.

3.  **LLM Assistant (VisionEdge Copilot):**
    * An on-device LLM assistant that explains observed trends.
    * Recommends research insights and provides context for data anomalies.

## 📱 UX Flow Overview

1.  **Login & Device Sync Screen**
    * Users sign in via Google or their institutional account.
    * Sync connected Edge Impulse devices via Bluetooth/WiFi.
    * The "Add New Station" feature detects and registers a local AI node.

2.  **Home Dashboard**
    * **Top Bar:** "VisionEdge" title with quick filters (Region | Model | Timeframe).
    * **Live Map Panel:** Displays raster data tiles with overlay layers for GHG, $NO_2$, and temperature. Edge inferences are highlighted as colored hotspots.
    * **Mini Stats Bar:** Shows key metrics like Emission Index, Confidence Level, and Anomaly Count. Tapping opens an expanded metrics view.

3.  **Analysis Panel**
    * Organized into tabs: `AI Inference` | `Time Series` | `Correlations` | `Ground Data`.
    * Features interactive plots generated from Edge outputs.
    * An "Open in Colab" option launches a notebook session with linked data for deeper analysis.
4.  **Ingestion**
    * Upload sensor data files directly to Edge Impulse project for training and analysis.
5.  **Copilot Assistant**
    * A floating chat widget allows users to "Ask VisionEdge Copilot."
    * Users can query the system with natural language, e.g., *“Explain today’s emission spike in the Cairo region”* to receive an AI-driven explanation.

6.  **Export & Share**
    * Download comprehensive reports as PDF or GeoTIFF files.
    * Push results directly to a shared research group or an institutional drive.

## 🎨 Design Direction

* **Theme:** A space black background with green-cyan gradients to represent emission heatmaps.
* **UI Style:** Sleek and minimal, following Material 3 design principles with a card-based layout.
* **Interactions:** Smooth map transitions, animated data updates, and collapsible charts for a fluid user experience.
* **Data Visualization:**
    * 2D raster overlays with opacity controls.
    * Dynamic graphs for comparing local inferences and historical data.

## Contributing

Contributions, issues, and feature requests are welcome.
For significant contributions, please propose an issue first to discuss what you would like to change.

## License

Licensed under the MIT License. See `LICENSE` for details.

## Authors

* [Ahmed Ibrahim Metawee]
* [AIMTY]
