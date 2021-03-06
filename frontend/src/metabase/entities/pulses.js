import React from "react";

import { createEntity, undo } from "metabase/lib/entities";
import * as Urls from "metabase/lib/urls";

import { normal } from "metabase/lib/colors";
import CollectionSelect from "metabase/containers/CollectionSelect";

const Pulses = createEntity({
  name: "pulses",
  path: "/api/pulse",

  objectActions: {
    // FIXME: not implemented in backend
    // setArchived: ({ id }, archived) => Pulses.actions.update({ id, archived }),

    setCollection: ({ id }, collection, opts) =>
      Pulses.actions.update(
        {
          id,
          // TODO - would be dope to make this check in one spot instead of on every movable item type
          collection_id:
            collection && collection.id === "root" ? null : collection.id,
        },
        undo(opts, "pulse", "moved"),
      ),
  },

  objectSelectors: {
    getName: pulse => pulse && pulse.name,
    getUrl: pulse => pulse && Urls.pulse(pulse.id),
    getIcon: pulse => "pulse",
    getColor: pulse => normal.yellow,
  },

  form: {
    fields: [
      { name: "name" },
      {
        name: "collection_id",
        title: "Collection",
        // eslint-disable-next-line react/display-name
        type: ({ field }) => <CollectionSelect {...field} />,
      },
    ],
  },
});

export default Pulses;
