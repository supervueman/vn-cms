<template lang="pug">
  v-card
    v-card-text
      v-flex
        v-layout.wrap 
          //- div(v-for="(field, i) in fields" :key="i + 11") {{field}}
          //-   br
          //-   br

          //- div Additional fields
          //- div(v-for="(field, i) in additionalFields" :key="i + 11") {{field}}
          //-   br
          //-   br
          v-toolbar(flat width="100%")
            v-spacer
            v-btn.mr-4(
              color="primary"
              @click="filterFieldsAll"
            ) {{d.all_fields || 'All fileds'}}
            v-flex.md4
              v-select(
                :items="fieldCategories"
                item-text="title"
                item-value="id"
                :label="`${d.field_category}:`"
                @change="filterFields($event)"
              )
          v-flex.mb-4
          v-flex.md12(v-for="(field, i) in fields" :key="i")
            v-layout.mb-4
              //- Text field
              v-flex(v-if="field.interface.fieldType === 'text'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-text-field(
                  v-model="field.value"
                )

              //- Textarea field
              v-flex(v-else-if="field.interface.fieldType === 'textarea'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-textarea(
                  v-model="field.value"
                )

              //- Editor field
              v-flex(v-else-if="field.interface.fieldType === 'editor'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div.mb-3(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                editor(
                  :content="field.value"
                  @update="field.value = $event()"
                )

              //- Image field
              v-flex(v-else-if="field.interface.fieldType === 'image'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div.mb-3(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                image-field(
                  :path.sync="field.value"
                  @selectFile="field.value = $event"
                )

              //- Select field
              v-flex(v-else-if="field.interface.fieldType === 'select'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-select(
                  :items="field.interface.defaultValue"
                  v-model="field.value"
                )
              
              //- Multiple select
              v-flex(v-else-if="field.interface.fieldType === 'multiselect'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-select(
                  v-model="field.value"
                  :items="field.interface.defaultValue"
                  label="Select"
                  multiple
                  chips
                  hint="What are the target regions"
                  persistent-hint
                )

              //- Migx field
              v-flex(v-else-if="field.interface.fieldType === 'migx'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                migx-field(
                  :field="field.value"
                  :schema="field.interface.schema"
                  @create="field.value.push($event)"
                  @update="field.value[$event.index] = $event.item"
                  @remove="field.value.splice($event, 1)"
                )

              //- Date field
              v-flex(v-else-if="field.interface.fieldType === 'date'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-menu(
                  ref="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                )
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="field.value"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    )
                  v-date-picker(
                    v-model="field.value"
                    no-title
                    scrollable
                    color="primary"
                  )

              //- Time field
              v-flex(v-else-if="field.interface.fieldType === 'time'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-menu(
                  ref="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                )
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="field.value"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    )
                  v-time-picker(
                    format="24hr"
                    v-model="field.value"
                  )

              //- Checkbox field
              v-flex(v-else-if="field.interface.fieldType === 'checkbox'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-checkbox(
                  color="primary"
                  v-model="field.value"
                )
              
              //- Colorpicker field
              v-flex(v-else-if="field.interface.fieldType === 'colorpicker'")
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-color-picker(
                  v-model="field.value"
                )
              
              //- Radio field
              v-flex(v-else-if="field.interface.fieldType === 'radio'") {{field.inteface}}
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    div(v-on="on") {{field.interface.title}}
                  span {{field.interface.slug}}
                v-radio-group(
                  v-model="field.value"
                  :mandatory="false"
                )
                  v-radio(
                    v-for="item in field.interface.defaultValue"
                    :key="item"
                    :label="item"
                    :value="item"
                  )
    v-card-actions
      v-btn.ml-2(
        color="primary"
        @click="saveAdditionalFields"
        v-if="r.is_resource_update"
      ) {{d.save}}
</template>

<script>
// Components
import MigxField from "@/components/Common/Migx/MigxField";

export default {
  name: "ResourceFields",

  components: {
    MigxField
  },

  props: {
    resource: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    additionalFields() {
      return this.$store.getters["resource/getAdditionalFields"];
    },
    fields() {
      return this.$store.getters["resource/getSerializedFields"];
    },
    fieldCategories() {
      return this.$store.getters["fieldcategory/getAll"];
    }
  },

  async mounted() {
    await this.$store.dispatch("fieldcategory/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  },

  methods: {
    async saveAdditionalFields() {
      if (!this.r.is_resource_update) {
        return;
      }
      const fields = [];

      for (let el in this.fields) {
        if (this.fields[el].id) {
          const updateField = {
            id: this.fields[el].id,
            slug: el,
            value: this.fields[el].value,
            resourceId: this.fields[el].resourceId,
            fieldId: this.fields[el].interface.id,
            categoryId: this.fields[el].interface.categoryId
          };
          if (this.fields[el].interface.fieldType === "migx") {
            updateField.value = JSON.stringify(this.fields[el].value);
          }
          if (this.fields[el].interface.fieldType === "multiselect") {
            updateField.value = JSON.stringify(this.fields[el].value);
          }
          fields.push(updateField);
        } else {
          const createField = {
            slug: el,
            value: this.fields[el].value,
            resourceId: this.fields[el].resourceId,
            fieldId: this.fields[el].interface.id,
            categoryId: this.fields[el].interface.categoryId
          };

          if (this.fields[el].interface.fieldType === "migx") {
            createField.value = JSON.stringify(this.fields[el].value);
          }
          if (this.fields[el].interface.fieldType === "multiselect") {
            createField.value = JSON.stringify(this.fields[el].value);
          }
          fields.push(createField);
        }
      }

      for await (let el of fields) {
        if (el.id) {
          await this.$store.dispatch("additionalfield/update", el);
        } else {
          await this.$store.dispatch("additionalfield/create", el);
        }
      }

      await this.$store.dispatch("resource/findByPk", {
        params: {
          id: this.$route.params.id
        },
        query: {
          filter: {
            include: [
              {
                association: "layout",
                include: ["fields"]
              },
              "additionalfields",
              "translations",
              "resourcetype"
            ]
          }
        }
      });
    },

    async filterFields(event) {
      const query = {
        filter: {
          include: [
            {
              association: "layout",
              include: [
                {
                  association: "fields",
                  where: { categoryId: event }
                }
              ]
            },
            {
              association: "additionalfields",
              where: { categoryId: event }
            },
            {
              association: "parent",
              include: ["translations"]
            },
            "translations",
            "resourcetype"
          ]
        }
      };
      if (this.resource.additionalfields.length === 0) {
        delete query.filter.include[1].where;
      }
      await this.$store.dispatch("resource/findByPk", {
        params: {
          id: this.$route.params.id
        },
        query
      });
    },

    async filterFieldsAll() {
      await this.$store.dispatch("resource/findByPk", {
        params: {
          id: this.$route.params.id
        },
        query: {
          filter: {
            include: [
              {
                association: "layout",
                include: [
                  {
                    association: "fields"
                  }
                ]
              },
              {
                association: "additionalfields"
              },
              {
                association: "parent",
                include: ["translations"]
              },
              "translations",
              "resourcetype"
            ]
          }
        }
      });
    }
  }
};
</script>
