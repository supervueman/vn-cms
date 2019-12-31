<template lang="pug">
	v-flex(v-if="r.is_resource_read")
		v-layout
			.body-2.mt-2.mb-12 {{d.resource || 'Resource'}}: {{resource.title}} ({{resource.id}})
			v-spacer
			resource-langs-menu
		v-tabs(
			v-model="tab"
			slider-color="primary"
			grow
		)
			v-tab {{d.common_data || 'Common data'}}
			v-tab-item.mt-3
				resource-tab
				v-flex.xs12.md7.pr-2
					.d-flex.justify-center
						v-btn.mb-2(
							text
							color="error"
							depressed
							@click="isRemoveDialog = true"
						) {{d.remove || 'Remove'}}
						v-dialog(
							v-model="isRemoveDialog"
							max-width="500px"
						)
							remove-confirm(
								@remove="remove"
								:isActive.sync="isRemoveDialog"
								:name="resource.title"
							)
			v-tab {{d.fields || 'Fields'}}
			v-tab-item.mt-3
				fields-tab
			v-tab {{d.resources || 'Resources'}}
			v-tab-item
				resources-tab.mt-3
</template>

<script>
// Queryies
import findByPkQuery from "../query/findByPkQuery";

// Components
import ResourceTab from "../components/ResourceTab";
import FieldsTab from "../components/FieldsTab";
import ResourcesTab from "../components/ResourcesTab";
import ResourceLangsMenu from "../components/ResourceLangsMenu";

export default {
  name: "Resource",

  components: {
    ResourceTab,
    FieldsTab,
    ResourcesTab,
    ResourceLangsMenu
  },

  metaInfo() {
    return {
      title: `${this.d.resource || "Resource"}: ${this.resource.title}`
    };
  },

  data() {
    return {
      tab: null,
      isRemoveDialog: false
    };
  },

  computed: {
    resource() {
      return this.$store.getters["resource/get"];
    }
  },

  async mounted() {
    const findByPkQueryData = findByPkQuery(this.$route.params.id);
    const bool = await this.$store.dispatch(
      "resource/findByPk",
      findByPkQueryData
    );

    if (bool) {
      await this.$store.dispatch("resource/findAll", {
        query: {
          filter: {
            offset: this.$route.query.offset || 0,
            limit: this.$route.query.limit || this.limit,
            order: [["createdAt", "DESC"]],
            where: {
              level: this.resource.level + 1,
              parentId: this.resource.id,
              lang: this.resource.lang
            }
          }
        }
      });
      await this.$store.dispatch("resource/count", {
        query: {
          filter: {
            where: {
              level: this.resource.level + 1,
              parentId: this.resource.id,
              lang: this.resource.lang
            }
          }
        }
      });
    }
  },

  methods: {
    async remove() {
      if (this.r.is_resource_delete) {
        const bool = await this.$store.dispatch("resource/remove", {
          params: { id: this.resource.id }
        });

        if (bool) {
          this.$router.push("/");
        }
      }
    }
  },

  async beforeRouteUpdate(to, from, next) {
    this.$store.dispatch("resource/clear");
    const findByPkQueryData = findByPkQuery(to.params.id);
    const bool = await this.$store.dispatch(
      "resource/findByPk",
      findByPkQueryData
    );

    if (bool) {
      await this.$store.dispatch("resource/findAll", {
        query: {
          filter: {
            offset: this.$route.query.offset || 0,
            limit: this.$route.query.limit || this.limit,
            order: [["createdAt", "DESC"]],
            where: {
              level: this.resource.level + 1,
              parentId: this.resource.id,
              lang: this.resource.lang
            }
          }
        }
      });
      await this.$store.dispatch("resource/count", {
        query: {
          filter: {
            where: {
              level: this.resource.level + 1,
              parentId: this.resource.id,
              lang: this.resource.lang
            }
          }
        }
      });
      next();
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("resource/clear");
    next();
  }
};
</script>

<style lang="sass">
	.theme--light.v-tabs-items
		background-color: transparent
</style>
