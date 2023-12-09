# Model Lens

Model Lens is an open-source alternative to Langsmith, designed for developers who need to debug Langchain agents and chains locally.

![example workflow](https://github.com/shanilfdo/lens/actions/workflows/node.js.yml/badge.svg)

## Features

- **Local Execution**: Model Lens can be run locally on your computer using either npx or Docker
- **Local Storage**: All data remains securely on local environment, ensuring no external data sharing.
- **Data Persistence**: With Model Lens, your data remains persistent across sessions, providing a seamless debugging experience.
- **Support for LANGCHAIN_TRACING_V2**: Model Lens is compatible with Langchain Tracering v2, allowing for efficient and effective debugging of Langchain agents and chains.

## Usage

### npx

```bash
npx model-lens@latest
```
This will start the Model Lens web interface and provide instructions for setting up the Langchain environment variables necessary to begin tracing.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for more details.

## Acknowledgments

We extend our gratitude to the Langchain and Langsmith teams for their inspirational work and for laying the groundwork upon which this project is built.