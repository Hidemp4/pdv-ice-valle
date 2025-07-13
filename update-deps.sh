#!/bin/bash

# Caminho para o arquivo README.md
README_FILE="README.md"

# Seção de Dependências a ser atualizada
START_SECTION="## 🔌 Dependências principais"
END_SECTION="##"

# Captura as dependências do package.json e ordena
DEPENDENCIES=$(jq -r '.dependencies, .devDependencies | keys[]' package.json | sort | sed 's/^/- /')

# Verifica se a seção de dependências já existe
if grep -q "$START_SECTION" "$README_FILE"; then
    # Remove a seção existente
    sed -i "/$START_SECTION/,/$END_SECTION/ d" "$README_FILE"
fi

# Adiciona ou atualiza a seção de dependências no README
echo -e "\n$START_SECTION\n" >> "$README_FILE"
echo "$DEPENDENCIES" >> "$README_FILE"
echo -e "\n" >> "$README_FILE"

echo "Dependências atualizadas com sucesso no $README_FILE!"
