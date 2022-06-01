HTML="html"

mkdir -p public

for FE_DIR in client/* ; do
  FE=${FE_DIR/client\//}

  # if [[ -f "${FE_DIR}/Makefile" ]]; then
  #   cd $FE_DIR && make all && cd -
  # fi

  for BE_DIR in server/* ; do
    if [[ "$BE_DIR" != *"-with-html" ]]; then
      BE=${BE_DIR/server\//}
      COMB="${FE}-and-${BE}";
      COMB_DIR="examples/${COMB}";
      
      [[ "${FE}" == "${HTML}" ]] && BE_DIR="${BE_DIR}-with-html"
      
      echo
      echo "========debug========"
      echo "FE: $FE"
      echo "BE: $BE"
      echo "COMB: $COMB"
      echo "========debug========"
      echo

      if [[ -d "$COMB_DIR" ]]; then
        rm -rf $COMB_DIR
      fi

      mkdir -p $COMB_DIR

      rsync -av ${BE_DIR}/ ${COMB_DIR}/server --exclude node_modules
      rsync -av ${FE_DIR}/ ${COMB_DIR}/client --exclude node_modules

      # readme title
      echo "# Smartpay Example: integrate with ${COMB}\n" > ${COMB_DIR}/README.md

      # readme header
      cat scripts/README-HEAD.md >> ${COMB_DIR}/README.md

      # new lines
      echo >> ${COMB_DIR}/README.md

      # TOFIX: update when more BE languages are avilable
      if [[ "$BE" == "python" ]]; then
        cat scripts/README-INSTALL-PYTHON.md >> ${COMB_DIR}/README.md
      elif [[ "$BE" == "ruby" ]]; then
        cat scripts/README-INSTALL-RUBY.md >> ${COMB_DIR}/README.md
      elif [[ "$BE" == "php" ]]; then
        cat scripts/README-INSTALL-PHP.md >> ${COMB_DIR}/README.md
      elif [[ "$BE" == "go" ]]; then
        cat scripts/README-INSTALL-GO.md >> ${COMB_DIR}/README.md
      fi

      # new lines
      echo >> ${COMB_DIR}/README.md

      # get started section
      cat scripts/README-GET-STARTED.md >> ${COMB_DIR}/README.md

      # new lines
      echo >> ${COMB_DIR}/README.md

      cat ${FE_DIR}/README.md >> ${COMB_DIR}/README.md

      # new lines
      echo >> ${COMB_DIR}/README.md

      cat ${BE_DIR}/README.md >> ${COMB_DIR}/README.md

      cp scripts/start.js ${COMB_DIR}/start.js
      cp scripts/.npmrc ${COMB_DIR}/.npmrc
      cp scripts/package.json ${COMB_DIR}/package.json

      jq ".name=\"smartpay-integration-example-${COMB}\"" ${COMB_DIR}/package.json | sponge ${COMB_DIR}/package.json
      jq ".scripts.client=\"cd client && $(cat ${FE_DIR}/start.sh)\"" ${COMB_DIR}/package.json | sponge ${COMB_DIR}/package.json
      jq ".scripts.server=\"cd server && $(cat ${BE_DIR}/start.sh)\"" ${COMB_DIR}/package.json | sponge ${COMB_DIR}/package.json

      rm public/${COMB}.zip

      rm ${COMB_DIR}/client/README.md
      rm ${COMB_DIR}/server/README.md

      cd examples && zip -r ../public/${COMB}.zip $COMB -x '*node_modules*' -x '*.DS_Store*' && cd -

    fi
  done

done
