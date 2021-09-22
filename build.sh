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

      echo "$COMB"


      if [[ -d "$COMB_DIR" ]]; then
        rm -rf $COMB_DIR
      fi

      mkdir -p $COMB_DIR

      rsync -av ${BE_DIR}/ ${COMB_DIR}/server --exclude node_modules
      rsync -av ${FE_DIR}/ ${COMB_DIR}/client --exclude node_modules

      echo "# Smartpay Example: ${COMB}\n" > ${COMB_DIR}/README.md
      cat scripts/README-HEAD.md >> ${COMB_DIR}/README.md
      echo >> ${COMB_DIR}/README.md
      cat ${FE_DIR}/README.md >> ${COMB_DIR}/README.md
      echo >> ${COMB_DIR}/README.md
      cat ${BE_DIR}/README.md >> ${COMB_DIR}/README.md

      cp scripts/start.sh ${COMB_DIR}/start.sh

      rm public/${COMB}.zip
      cd examples && zip -r ../public/${COMB}.zip $COMB -x '*node_modules*' -x '*.DS_Store*' -x '*build*' && cd -
    fi
  done

done
