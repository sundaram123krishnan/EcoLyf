<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import H1 from '$lib/components/ui/typography/H1.svelte';
	import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
	import { LoaderCircle } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	// let scannerOpen = $state(true);
	// let fetchingDetails = $state(false);
	// let productData = $state<any>();

	let scannerOpen = $state(false);
	let fetchingDetails = $state(false);
	let productData = $state<any>({
		_id: '5053990137787',
		_keywords: [
			'and',
			'appetizer',
			'chip',
			'crisp',
			'frie',
			'from',
			'made',
			'original',
			'potato',
			'pringle',
			'salty',
			'snack',
			'tub'
		],
		added_countries_tags: [],
		additives_n: 1,
		additives_original_tags: ['en:e471'],
		additives_tags: ['en:e471'],
		allergens: '',
		allergens_from_ingredients: 'en:gluten',
		allergens_from_user: '(en) ',
		allergens_hierarchy: ['en:gluten'],
		allergens_tags: ['en:gluten'],
		amino_acids_tags: [],
		brands: 'Pringles',
		brands_tags: ['pringles'],
		categories:
			'Snacks, Salty snacks, Appetizers, Chips and fries, Crisps, Salty snacks made from potato',
		categories_hierarchy: [
			'en:snacks',
			'en:salty-snacks',
			'en:appetizers',
			'en:chips-and-fries',
			'en:crisps',
			'en:salty-snacks-made-from-potato'
		],
		categories_lc: 'en',
		categories_old:
			'Snacks, Salty snacks, Appetizers, Chips and fries, Crisps, Salty snacks made from potato',
		categories_properties: {
			'agribalyse_food_code:en': '38405',
			'ciqual_food_code:en': '38405'
		},
		categories_properties_tags: [
			'all-products',
			'categories-known',
			'agribalyse-food-code-38405',
			'agribalyse-food-code-known',
			'agribalyse-proxy-food-code-unknown',
			'ciqual-food-code-38405',
			'ciqual-food-code-known',
			'agribalyse-known',
			'agribalyse-38405'
		],
		categories_tags: [
			'en:snacks',
			'en:salty-snacks',
			'en:appetizers',
			'en:chips-and-fries',
			'en:crisps',
			'en:salty-snacks-made-from-potato'
		],
		category_properties: {},
		checkers_tags: [],
		ciqual_food_name_tags: ['unknown'],
		code: '5053990137787',
		codes_tags: [
			'code-13',
			'5053990137xxx',
			'505399013xxxx',
			'50539901xxxxx',
			'5053990xxxxxx',
			'505399xxxxxxx',
			'50539xxxxxxxx',
			'5053xxxxxxxxx',
			'505xxxxxxxxxx',
			'50xxxxxxxxxxx',
			'5xxxxxxxxxxxx'
		],
		compared_to_category: 'en:salty-snacks-made-from-potato',
		complete: 0,
		completeness: 0.6875,
		correctors_tags: ['openfoodfacts-contributors', 'xdcloudy'],
		countries: 'en:United Kingdom',
		countries_hierarchy: ['en:united-kingdom'],
		countries_tags: ['en:united-kingdom'],
		created_t: 1569182641,
		creator: 'openfoodfacts-contributors',
		data_quality_bugs_tags: [],
		data_quality_errors_tags: [],
		data_quality_info_tags: [
			'en:no-packaging-data',
			'en:ingredients-percent-analysis-ok',
			'en:ecoscore-extended-data-not-computed',
			'en:food-groups-1-known',
			'en:food-groups-2-known',
			'en:food-groups-3-unknown'
		],
		data_quality_tags: [
			'en:no-packaging-data',
			'en:ingredients-percent-analysis-ok',
			'en:ecoscore-extended-data-not-computed',
			'en:food-groups-1-known',
			'en:food-groups-2-known',
			'en:food-groups-3-unknown',
			'en:ecoscore-origins-of-ingredients-origins-are-100-percent-unknown',
			'en:ecoscore-packaging-packaging-data-missing',
			'en:ecoscore-production-system-no-label'
		],
		data_quality_warnings_tags: [
			'en:ecoscore-origins-of-ingredients-origins-are-100-percent-unknown',
			'en:ecoscore-packaging-packaging-data-missing',
			'en:ecoscore-production-system-no-label'
		],
		data_sources: 'App - smoothie-openfoodfacts, Apps',
		data_sources_tags: ['app-smoothie-openfoodfacts', 'apps'],
		ecoscore_data: {
			adjustments: {
				origins_of_ingredients: {
					aggregated_origins: [
						{
							epi_score: 0,
							origin: 'en:unknown',
							percent: 100,
							transportation_score: 0
						}
					],
					epi_score: 0,
					epi_value: -5,
					origins_from_categories: ['en:unknown'],
					origins_from_origins_field: ['en:unknown'],
					transportation_score: 0,
					transportation_scores: {
						ad: 0,
						al: 0,
						at: 0,
						ax: 0,
						ba: 0,
						be: 0,
						bg: 0,
						ch: 0,
						cy: 0,
						cz: 0,
						de: 0,
						dk: 0,
						dz: 0,
						ee: 0,
						eg: 0,
						es: 0,
						fi: 0,
						fo: 0,
						fr: 0,
						gg: 0,
						gi: 0,
						gr: 0,
						hr: 0,
						hu: 0,
						ie: 0,
						il: 0,
						im: 0,
						is: 0,
						it: 0,
						je: 0,
						lb: 0,
						li: 0,
						lt: 0,
						lu: 0,
						lv: 0,
						ly: 0,
						ma: 0,
						mc: 0,
						md: 0,
						me: 0,
						mk: 0,
						mt: 0,
						nl: 0,
						no: 0,
						pl: 0,
						ps: 0,
						pt: 0,
						ro: 0,
						rs: 0,
						se: 0,
						si: 0,
						sj: 0,
						sk: 0,
						sm: 0,
						sy: 0,
						tn: 0,
						tr: 0,
						ua: 0,
						uk: 0,
						us: 0,
						va: 0,
						world: 0,
						xk: 0
					},
					transportation_value: 0,
					transportation_values: {
						ad: 0,
						al: 0,
						at: 0,
						ax: 0,
						ba: 0,
						be: 0,
						bg: 0,
						ch: 0,
						cy: 0,
						cz: 0,
						de: 0,
						dk: 0,
						dz: 0,
						ee: 0,
						eg: 0,
						es: 0,
						fi: 0,
						fo: 0,
						fr: 0,
						gg: 0,
						gi: 0,
						gr: 0,
						hr: 0,
						hu: 0,
						ie: 0,
						il: 0,
						im: 0,
						is: 0,
						it: 0,
						je: 0,
						lb: 0,
						li: 0,
						lt: 0,
						lu: 0,
						lv: 0,
						ly: 0,
						ma: 0,
						mc: 0,
						md: 0,
						me: 0,
						mk: 0,
						mt: 0,
						nl: 0,
						no: 0,
						pl: 0,
						ps: 0,
						pt: 0,
						ro: 0,
						rs: 0,
						se: 0,
						si: 0,
						sj: 0,
						sk: 0,
						sm: 0,
						sy: 0,
						tn: 0,
						tr: 0,
						ua: 0,
						uk: 0,
						us: 0,
						va: 0,
						world: 0,
						xk: 0
					},
					value: -5,
					values: {
						ad: -5,
						al: -5,
						at: -5,
						ax: -5,
						ba: -5,
						be: -5,
						bg: -5,
						ch: -5,
						cy: -5,
						cz: -5,
						de: -5,
						dk: -5,
						dz: -5,
						ee: -5,
						eg: -5,
						es: -5,
						fi: -5,
						fo: -5,
						fr: -5,
						gg: -5,
						gi: -5,
						gr: -5,
						hr: -5,
						hu: -5,
						ie: -5,
						il: -5,
						im: -5,
						is: -5,
						it: -5,
						je: -5,
						lb: -5,
						li: -5,
						lt: -5,
						lu: -5,
						lv: -5,
						ly: -5,
						ma: -5,
						mc: -5,
						md: -5,
						me: -5,
						mk: -5,
						mt: -5,
						nl: -5,
						no: -5,
						pl: -5,
						ps: -5,
						pt: -5,
						ro: -5,
						rs: -5,
						se: -5,
						si: -5,
						sj: -5,
						sk: -5,
						sm: -5,
						sy: -5,
						tn: -5,
						tr: -5,
						ua: -5,
						uk: -5,
						us: -5,
						va: -5,
						world: -5,
						xk: -5
					},
					warning: 'origins_are_100_percent_unknown'
				},
				packaging: {
					value: -15,
					warning: 'packaging_data_missing'
				},
				production_system: {
					labels: [],
					value: 0,
					warning: 'no_label'
				},
				threatened_species: {}
			},
			agribalyse: {
				agribalyse_food_code: '38405',
				co2_agriculture: 0.85124335,
				co2_consumption: 0,
				co2_distribution: 0.019437894,
				co2_packaging: 0.28132688,
				co2_processing: 0.29801521,
				co2_total: 1.587567974,
				co2_transportation: 0.13754464,
				code: '38405',
				dqr: '2.68',
				ef_agriculture: 0.12973953,
				ef_consumption: 0,
				ef_distribution: 0.0047895045,
				ef_packaging: 0.02360145,
				ef_processing: 0.049695845,
				ef_total: 0.2193642885,
				ef_transportation: 0.011537959,
				is_beverage: 0,
				name_en: 'Salty snacks, made from potato',
				name_fr: 'Biscuit apéritif à base de pomme de terre, type tuile salée',
				score: 87,
				version: '3.1.1'
			},
			grade: 'b',
			grades: {
				ad: 'b',
				al: 'b',
				at: 'b',
				ax: 'b',
				ba: 'b',
				be: 'b',
				bg: 'b',
				ch: 'b',
				cy: 'b',
				cz: 'b',
				de: 'b',
				dk: 'b',
				dz: 'b',
				ee: 'b',
				eg: 'b',
				es: 'b',
				fi: 'b',
				fo: 'b',
				fr: 'b',
				gg: 'b',
				gi: 'b',
				gr: 'b',
				hr: 'b',
				hu: 'b',
				ie: 'b',
				il: 'b',
				im: 'b',
				is: 'b',
				it: 'b',
				je: 'b',
				lb: 'b',
				li: 'b',
				lt: 'b',
				lu: 'b',
				lv: 'b',
				ly: 'b',
				ma: 'b',
				mc: 'b',
				md: 'b',
				me: 'b',
				mk: 'b',
				mt: 'b',
				nl: 'b',
				no: 'b',
				pl: 'b',
				ps: 'b',
				pt: 'b',
				ro: 'b',
				rs: 'b',
				se: 'b',
				si: 'b',
				sj: 'b',
				sk: 'b',
				sm: 'b',
				sy: 'b',
				tn: 'b',
				tr: 'b',
				ua: 'b',
				uk: 'b',
				us: 'b',
				va: 'b',
				world: 'b',
				xk: 'b'
			},
			missing: {
				labels: 1,
				origins: 1,
				packagings: 1
			},
			missing_data_warning: 1,
			missing_key_data: 1,
			previous_data: {
				agribalyse: {
					agribalyse_food_code: '38405',
					co2_agriculture: 1.0203258,
					co2_consumption: 0,
					co2_distribution: 0.029120657,
					co2_packaging: 0.28596322,
					co2_processing: 0.34487873,
					co2_total: 1.8689845,
					co2_transportation: 0.18873101,
					code: '38405',
					dqr: '2.68',
					ef_agriculture: 0.15602536,
					ef_consumption: 0,
					ef_distribution: 0.0098990521,
					ef_packaging: 0.021572323,
					ef_processing: 0.054753277,
					ef_total: 0.25847155,
					ef_transportation: 0.016224129,
					is_beverage: 0,
					name_en: 'Salty snacks, made from potato',
					name_fr: 'Biscuit apéritif à base de pomme de terre, type tuile salée',
					score: 82
				},
				grade: 'b',
				score: 62
			},
			score: 67,
			scores: {
				ad: 67,
				al: 67,
				at: 67,
				ax: 67,
				ba: 67,
				be: 67,
				bg: 67,
				ch: 67,
				cy: 67,
				cz: 67,
				de: 67,
				dk: 67,
				dz: 67,
				ee: 67,
				eg: 67,
				es: 67,
				fi: 67,
				fo: 67,
				fr: 67,
				gg: 67,
				gi: 67,
				gr: 67,
				hr: 67,
				hu: 67,
				ie: 67,
				il: 67,
				im: 67,
				is: 67,
				it: 67,
				je: 67,
				lb: 67,
				li: 67,
				lt: 67,
				lu: 67,
				lv: 67,
				ly: 67,
				ma: 67,
				mc: 67,
				md: 67,
				me: 67,
				mk: 67,
				mt: 67,
				nl: 67,
				no: 67,
				pl: 67,
				ps: 67,
				pt: 67,
				ro: 67,
				rs: 67,
				se: 67,
				si: 67,
				sj: 67,
				sk: 67,
				sm: 67,
				sy: 67,
				tn: 67,
				tr: 67,
				ua: 67,
				uk: 67,
				us: 67,
				va: 67,
				world: 67,
				xk: 67
			},
			status: 'known'
		},
		ecoscore_grade: 'b',
		ecoscore_score: 67,
		ecoscore_tags: ['b'],
		editors_tags: ['openfoodfacts-contributors', 'telperion87', 'xdcloudy'],
		entry_dates_tags: ['2019-09-22', '2019-09', '2019'],
		food_groups: 'en:appetizers',
		food_groups_tags: ['en:salty-snacks', 'en:appetizers'],
		id: '5053990137787',
		image_front_small_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_en.12.200.jpg',
		image_front_thumb_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_en.12.100.jpg',
		image_front_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_en.12.400.jpg',
		image_ingredients_small_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/ingredients_en.14.200.jpg',
		image_ingredients_thumb_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/ingredients_en.14.100.jpg',
		image_ingredients_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/ingredients_en.14.400.jpg',
		image_nutrition_small_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/nutrition_en.16.200.jpg',
		image_nutrition_thumb_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/nutrition_en.16.100.jpg',
		image_nutrition_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/nutrition_en.16.400.jpg',
		image_small_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_en.12.200.jpg',
		image_thumb_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_en.12.100.jpg',
		image_url:
			'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_en.12.400.jpg',
		images: {
			'1': {
				sizes: {
					'100': {
						h: 100,
						w: 75
					},
					'400': {
						h: 400,
						w: 300
					},
					full: {
						h: 4032,
						w: 3024
					}
				},
				uploaded_t: 1569182641,
				uploader: 'openfoodfacts-contributors'
			},
			'2': {
				sizes: {
					'100': {
						h: 100,
						w: 75
					},
					'400': {
						h: 400,
						w: 300
					},
					full: {
						h: 4032,
						w: 3024
					}
				},
				uploaded_t: 1576078344,
				uploader: 'openfoodfacts-contributors'
			},
			'3': {
				sizes: {
					'100': {
						h: 100,
						w: 75
					},
					'400': {
						h: 400,
						w: 300
					},
					full: {
						h: 2918,
						w: 2188
					}
				},
				uploaded_t: 1591445530,
				uploader: 'openfoodfacts-contributors'
			},
			'4': {
				sizes: {
					'100': {
						h: 100,
						w: 100
					},
					'400': {
						h: 400,
						w: 400
					},
					full: {
						h: 700,
						w: 700
					}
				},
				uploaded_t: 1712780118,
				uploader: 'xdcloudy'
			},
			'5': {
				sizes: {
					'100': {
						h: 57,
						w: 100
					},
					'400': {
						h: 227,
						w: 400
					},
					full: {
						h: 614,
						w: 1080
					}
				},
				uploaded_t: 1712780165,
				uploader: 'xdcloudy'
			},
			'6': {
				sizes: {
					'100': {
						h: 100,
						w: 58
					},
					'400': {
						h: 400,
						w: 230
					},
					full: {
						h: 1872,
						w: 1078
					}
				},
				uploaded_t: 1712780214,
				uploader: 'xdcloudy'
			},
			front_ar: {
				angle: 0,
				geometry: '0x0--10--10',
				imgid: '1',
				normalize: null,
				rev: '5',
				sizes: {
					'100': {
						h: 100,
						w: 75
					},
					'200': {
						h: 200,
						w: 150
					},
					'400': {
						h: 400,
						w: 300
					},
					full: {
						h: 4032,
						w: 3024
					}
				},
				white_magic: null,
				x1: '-1',
				x2: '-1',
				y1: '-1',
				y2: '-1'
			},
			front_en: {
				angle: 0,
				coordinates_image_size: 'full',
				geometry: '0x0--1--1',
				imgid: '4',
				normalize: null,
				rev: '12',
				sizes: {
					'100': {
						h: 100,
						w: 87
					},
					'200': {
						h: 200,
						w: 175
					},
					'400': {
						h: 400,
						w: 350
					},
					full: {
						h: 683,
						w: 597
					}
				},
				white_magic: null,
				x1: '-1',
				x2: '-1',
				y1: '-1',
				y2: '-1'
			},
			ingredients_en: {
				angle: 0,
				coordinates_image_size: 'full',
				geometry: '0x0--1--1',
				imgid: '5',
				normalize: null,
				rev: '14',
				sizes: {
					'100': {
						h: 64,
						w: 100
					},
					'200': {
						h: 128,
						w: 200
					},
					'400': {
						h: 255,
						w: 400
					},
					full: {
						h: 577,
						w: 904
					}
				},
				white_magic: null,
				x1: '-1',
				x2: '-1',
				y1: '-1',
				y2: '-1'
			},
			nutrition_en: {
				angle: 0,
				coordinates_image_size: 'full',
				geometry: '0x0--1--1',
				imgid: '6',
				normalize: null,
				rev: '16',
				sizes: {
					'100': {
						h: 100,
						w: 58
					},
					'200': {
						h: 200,
						w: 116
					},
					'400': {
						h: 400,
						w: 232
					},
					full: {
						h: 1848,
						w: 1070
					}
				},
				white_magic: null,
				x1: '-1',
				x2: '-1',
				y1: '-1',
				y2: '-1'
			}
		},
		informers_tags: ['openfoodfacts-contributors', 'telperion87', 'xdcloudy'],
		ingredients: [
			{
				ciqual_food_code: '4003',
				ecobalyse_code: 'potato-industry-fr',
				id: 'en:potato',
				is_in_taxonomy: 1,
				percent_estimate: 55.5555555555556,
				percent_max: 100,
				percent_min: 11.1111111111111,
				processing: 'en:dried',
				text: 'POTATOES',
				vegan: 'yes',
				vegetarian: 'yes'
			},
			{
				from_palm_oil: 'maybe',
				id: 'en:vegetable-oil',
				ingredients: [
					{
						ciqual_food_code: '9200',
						id: 'en:corn',
						is_in_taxonomy: 1,
						percent_estimate: 11.1111111111111,
						percent_max: 50,
						percent_min: 0,
						text: 'CORN',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						id: 'en:cottonseed',
						is_in_taxonomy: 1,
						percent_estimate: 5.55555555555556,
						percent_max: 25,
						percent_min: 0,
						text: 'COTTONSEED',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						id: 'en:high-oleic-soybean',
						is_in_taxonomy: 0,
						percent_estimate: 2.77777777777778,
						percent_max: 16.6666666666667,
						percent_min: 0,
						text: 'HIGH OLEIC SOYBEAN'
					},
					{
						ciqual_food_code: '17440',
						ecobalyse_code: 'sunflower-oil',
						from_palm_oil: 'no',
						id: 'en:sunflower-oil',
						is_in_taxonomy: 1,
						percent_estimate: 2.77777777777778,
						percent_max: 12.5,
						percent_min: 0,
						text: 'and SUNFLOWER OIL',
						vegan: 'yes',
						vegetarian: 'yes'
					}
				],
				is_in_taxonomy: 1,
				percent_estimate: 22.2222222222222,
				percent_max: 50,
				percent_min: 0,
				text: 'VEGETABLE OIL',
				vegan: 'yes',
				vegetarian: 'yes'
			},
			{
				id: 'en:degerminated-yellow-corn-flour',
				is_in_taxonomy: 0,
				percent_estimate: 11.1111111111111,
				percent_max: 33.3333333333333,
				percent_min: 0,
				text: 'DEGERMINATED YELLOW CORN FLOUR'
			},
			{
				ciqual_food_code: '9510',
				id: 'en:corn-starch',
				is_in_taxonomy: 1,
				percent_estimate: 5.55555555555556,
				percent_max: 25,
				percent_min: 0,
				text: 'CORNSTARCH',
				vegan: 'yes',
				vegetarian: 'yes'
			},
			{
				ciqual_food_code: '9520',
				ecobalyse_proxy_code: 'flour',
				id: 'en:rice-flour',
				is_in_taxonomy: 1,
				percent_estimate: 2.77777777777778,
				percent_max: 20,
				percent_min: 0,
				text: 'RICE FLOUR',
				vegan: 'yes',
				vegetarian: 'yes'
			},
			{
				id: 'en:maltodextrin',
				is_in_taxonomy: 1,
				percent_estimate: 1.38888888888889,
				percent_max: 16.6666666666667,
				percent_min: 0,
				text: 'MALTODEXTRIN',
				vegan: 'yes',
				vegetarian: 'yes'
			},
			{
				from_palm_oil: 'maybe',
				id: 'en:e471',
				is_in_taxonomy: 1,
				percent_estimate: 0.694444444444443,
				percent_max: 14.2857142857143,
				percent_min: 0,
				text: 'mono- and DIGLYCERIDES',
				vegan: 'maybe',
				vegetarian: 'maybe'
			},
			{
				ciqual_food_code: '11058',
				id: 'en:salt',
				is_in_taxonomy: 1,
				percent_estimate: 0.268,
				percent_max: 0.536,
				percent_min: 0,
				text: 'SALT',
				vegan: 'yes',
				vegetarian: 'yes'
			},
			{
				ciqual_proxy_food_code: '9510',
				id: 'en:wheat-starch',
				is_in_taxonomy: 1,
				percent_estimate: 0.426444444444442,
				percent_max: 0.536,
				percent_min: 0,
				text: 'WHEAT STARCH',
				vegan: 'yes',
				vegetarian: 'yes'
			}
		],
		ingredients_analysis: {
			'en:may-contain-palm-oil': ['en:e471'],
			'en:vegan-status-unknown': ['en:high-oleic-soybean', 'en:degerminated-yellow-corn-flour'],
			'en:vegetarian-status-unknown': ['en:high-oleic-soybean', 'en:degerminated-yellow-corn-flour']
		},
		ingredients_analysis_tags: [
			'en:may-contain-palm-oil',
			'en:vegan-status-unknown',
			'en:vegetarian-status-unknown'
		],
		ingredients_from_palm_oil_tags: [],
		ingredients_hierarchy: [
			'en:potato',
			'en:vegetable',
			'en:root-vegetable',
			'en:tuber',
			'en:vegetable-oil',
			'en:oil-and-fat',
			'en:vegetable-oil-and-fat',
			'en:degerminated-yellow-corn-flour',
			'en:corn-starch',
			'en:starch',
			'en:rice-flour',
			'en:flour',
			'en:rice',
			'en:maltodextrin',
			'en:e471',
			'en:salt',
			'en:wheat-starch',
			'en:corn',
			'en:cereal',
			'en:cottonseed',
			'en:seed',
			'en:high-oleic-soybean',
			'en:sunflower-oil'
		],
		ingredients_lc: 'en',
		ingredients_n: 13,
		ingredients_n_tags: ['13', '11-20'],
		ingredients_non_nutritive_sweeteners_n: 0,
		ingredients_original_tags: [
			'en:potato',
			'en:vegetable-oil',
			'en:degerminated-yellow-corn-flour',
			'en:corn-starch',
			'en:rice-flour',
			'en:maltodextrin',
			'en:e471',
			'en:salt',
			'en:wheat-starch',
			'en:corn',
			'en:cottonseed',
			'en:high-oleic-soybean',
			'en:sunflower-oil'
		],
		ingredients_percent_analysis: 1,
		ingredients_sweeteners_n: 0,
		ingredients_tags: [
			'en:potato',
			'en:vegetable',
			'en:root-vegetable',
			'en:tuber',
			'en:vegetable-oil',
			'en:oil-and-fat',
			'en:vegetable-oil-and-fat',
			'en:degerminated-yellow-corn-flour',
			'en:corn-starch',
			'en:starch',
			'en:rice-flour',
			'en:flour',
			'en:rice',
			'en:maltodextrin',
			'en:e471',
			'en:salt',
			'en:wheat-starch',
			'en:corn',
			'en:cereal',
			'en:cottonseed',
			'en:seed',
			'en:high-oleic-soybean',
			'en:sunflower-oil'
		],
		ingredients_text:
			'DRIED POTATOES, VEGETABLE OIL (CORN, COTTONSEED, HIGH OLEIC SOYBEAN, AND/OR SUNFLOWER OIL), DEGERMINATED YELLOW CORN FLOUR, CORNSTARCH, RICE FLOUR, MALTODEXTRIN, MONO - AND DIGLYCERIDES, SALT, WHEAT STARCH',
		ingredients_text_en:
			'DRIED POTATOES, VEGETABLE OIL (CORN, COTTONSEED, HIGH OLEIC SOYBEAN, AND/OR SUNFLOWER OIL), DEGERMINATED YELLOW CORN FLOUR, CORNSTARCH, RICE FLOUR, MALTODEXTRIN, MONO - AND DIGLYCERIDES, SALT, WHEAT STARCH',
		ingredients_text_with_allergens:
			'DRIED POTATOES, VEGETABLE OIL (CORN, COTTONSEED, HIGH OLEIC SOYBEAN, AND/OR SUNFLOWER OIL), DEGERMINATED YELLOW CORN FLOUR, CORNSTARCH, RICE FLOUR, MALTODEXTRIN, MONO - AND DIGLYCERIDES, SALT, WHEAT STARCH',
		ingredients_text_with_allergens_en:
			'DRIED POTATOES, VEGETABLE OIL (CORN, COTTONSEED, HIGH OLEIC SOYBEAN, AND/OR SUNFLOWER OIL), DEGERMINATED YELLOW CORN FLOUR, CORNSTARCH, RICE FLOUR, MALTODEXTRIN, MONO - AND DIGLYCERIDES, SALT, WHEAT STARCH',
		ingredients_that_may_be_from_palm_oil_tags: [],
		ingredients_with_specified_percent_n: 0,
		ingredients_with_specified_percent_sum: 0,
		ingredients_with_unspecified_percent_n: 12,
		ingredients_with_unspecified_percent_sum: 100,
		ingredients_without_ciqual_codes: [
			'en:cottonseed',
			'en:degerminated-yellow-corn-flour',
			'en:e471',
			'en:high-oleic-soybean',
			'en:maltodextrin',
			'en:vegetable-oil'
		],
		ingredients_without_ciqual_codes_n: 6,
		ingredients_without_ecobalyse_ids: [
			'en:corn',
			'en:corn-starch',
			'en:cottonseed',
			'en:degerminated-yellow-corn-flour',
			'en:e471',
			'en:high-oleic-soybean',
			'en:maltodextrin',
			'en:salt',
			'en:vegetable-oil',
			'en:wheat-starch'
		],
		ingredients_without_ecobalyse_ids_n: 10,
		interface_version_created: '20120622',
		interface_version_modified: '20150316.jqm2',
		known_ingredients_n: 21,
		lang: 'en',
		languages: {
			'en:arabic': 1,
			'en:english': 5
		},
		languages_codes: {
			ar: 1,
			en: 5
		},
		languages_hierarchy: ['en:arabic', 'en:english'],
		languages_tags: ['en:arabic', 'en:english', 'en:2', 'en:multilingual'],
		last_edit_dates_tags: ['2024-04-10', '2024-04', '2024'],
		last_editor: 'xdcloudy',
		last_image_dates_tags: ['2024-04-10', '2024-04', '2024'],
		last_image_t: 1712780215,
		last_modified_by: 'xdcloudy',
		last_modified_t: 1712780450,
		last_updated_t: 1729881550,
		lc: 'en',
		main_countries_tags: [],
		max_imgid: '6',
		minerals_tags: [],
		misc_tags: [
			'en:ecoscore-changed',
			'en:ecoscore-computed',
			'en:ecoscore-extended-data-not-computed',
			'en:ecoscore-missing-data-labels',
			'en:ecoscore-missing-data-no-packagings',
			'en:ecoscore-missing-data-origins',
			'en:ecoscore-missing-data-packagings',
			'en:ecoscore-missing-data-warning',
			'en:nutriscore-2021-d-2023-d',
			'en:nutriscore-2021-same-as-2023',
			'en:nutriscore-computed',
			'en:nutrition-fruits-vegetables-legumes-from-category',
			'en:nutrition-fruits-vegetables-legumes-from-category-en-salty-snacks-made-from-potato',
			'en:nutrition-fruits-vegetables-nuts-from-category',
			'en:nutrition-fruits-vegetables-nuts-from-category-en-salty-snacks-made-from-potato',
			'en:packagings-empty',
			'en:packagings-not-complete',
			'en:packagings-number-of-components-0'
		],
		no_nutrition_data: '',
		nova_group: 4,
		nova_group_debug: '',
		nova_groups: '4',
		nova_groups_markers: {
			'3': [
				['categories', 'en:salty-snacks'],
				['ingredients', 'en:salt'],
				['ingredients', 'en:starch'],
				['ingredients', 'en:vegetable-oil']
			],
			'4': [
				['additives', 'en:e471'],
				['ingredients', 'en:maltodextrin']
			]
		},
		nova_groups_tags: ['en:4-ultra-processed-food-and-drink-products'],
		nucleotides_tags: [],
		nutrient_levels: {
			fat: 'high',
			salt: 'moderate',
			'saturated-fat': 'high',
			sugars: 'low'
		},
		nutrient_levels_tags: [
			'en:fat-in-high-quantity',
			'en:saturated-fat-in-high-quantity',
			'en:sugars-in-low-quantity',
			'en:salt-in-moderate-quantity'
		],
		nutriments: {
			carbohydrates: 16,
			carbohydrates_100g: 57.1,
			carbohydrates_serving: 16,
			carbohydrates_unit: 'g',
			carbohydrates_value: 16,
			energy: 628,
			'energy-kcal': 150,
			'energy-kcal_100g': 536,
			'energy-kcal_serving': 150,
			'energy-kcal_unit': 'kcal',
			'energy-kcal_value': 150,
			'energy-kcal_value_computed': 151,
			energy_100g: 2240,
			energy_serving: 628,
			energy_unit: 'kcal',
			energy_value: 150,
			fat: 9,
			fat_100g: 32.1,
			fat_serving: 9,
			fat_unit: 'g',
			fat_value: 9,
			fiber: 1,
			fiber_100g: 3.57,
			fiber_serving: 1,
			fiber_unit: 'g',
			fiber_value: 1,
			'fruits-vegetables-legumes-estimate-from-ingredients_100g': 0,
			'fruits-vegetables-legumes-estimate-from-ingredients_serving': 0,
			'fruits-vegetables-nuts-estimate-from-ingredients_100g': 0,
			'fruits-vegetables-nuts-estimate-from-ingredients_serving': 0,
			'nova-group': 4,
			'nova-group_100g': 4,
			'nova-group_serving': 4,
			'nutrition-score-fr': 13,
			'nutrition-score-fr_100g': 13,
			proteins: 1,
			proteins_100g: 3.57,
			proteins_serving: 1,
			proteins_unit: 'g',
			proteins_value: 1,
			salt: 0.15,
			salt_100g: 0.536,
			salt_serving: 0.15,
			salt_unit: 'g',
			salt_value: 0.15,
			'saturated-fat': 2.5,
			'saturated-fat_100g': 8.93,
			'saturated-fat_serving': 2.5,
			'saturated-fat_unit': 'g',
			'saturated-fat_value': 2.5,
			sodium: 0.06,
			sodium_100g: 0.214,
			sodium_serving: 0.06,
			sodium_unit: 'g',
			sodium_value: 0.06,
			sugars: 0,
			sugars_100g: 0,
			sugars_serving: 0,
			sugars_unit: 'g',
			sugars_value: 0
		},
		nutriscore: {
			'2021': {
				category_available: 1,
				data: {
					energy: 2240,
					energy_points: 6,
					energy_value: 2240,
					fiber: 3.57,
					fiber_points: 3,
					fiber_value: 3.57,
					fruits_vegetables_nuts_colza_walnut_olive_oils: '0',
					fruits_vegetables_nuts_colza_walnut_olive_oils_points: 0,
					fruits_vegetables_nuts_colza_walnut_olive_oils_value: 0,
					is_beverage: 0,
					is_cheese: 0,
					is_fat: 0,
					is_water: 0,
					negative_points: 16,
					positive_points: 3,
					proteins: 3.57,
					proteins_points: 2,
					proteins_value: 3.57,
					saturated_fat: 8.93,
					saturated_fat_points: 8,
					saturated_fat_value: 8.9,
					sodium: 214,
					sodium_points: 2,
					sodium_value: 214,
					sugars: 0,
					sugars_points: 0,
					sugars_value: 0
				},
				grade: 'd',
				nutrients_available: 1,
				nutriscore_applicable: 1,
				nutriscore_computed: 1,
				score: 13
			},
			'2023': {
				category_available: 1,
				data: {
					components: {
						negative: [
							{
								id: 'energy',
								points: 6,
								points_max: 10,
								unit: 'kJ',
								value: 2240
							},
							{
								id: 'sugars',
								points: 0,
								points_max: 15,
								unit: 'g',
								value: 0
							},
							{
								id: 'saturated_fat',
								points: 8,
								points_max: 10,
								unit: 'g',
								value: 8.93
							},
							{
								id: 'salt',
								points: 2,
								points_max: 20,
								unit: 'g',
								value: 0.54
							}
						],
						positive: [
							{
								id: 'fiber',
								points: 1,
								points_max: 5,
								unit: 'g',
								value: 3.57
							},
							{
								id: 'fruits_vegetables_legumes',
								points: 0,
								points_max: 5,
								unit: '%',
								value: 0
							}
						]
					},
					count_proteins: 0,
					count_proteins_reason: 'negative_points_greater_than_or_equal_to_11',
					is_beverage: 0,
					is_cheese: 0,
					is_fat_oil_nuts_seeds: 0,
					is_red_meat_product: 0,
					is_water: 0,
					negative_points: 16,
					negative_points_max: 55,
					positive_nutrients: ['fiber', 'fruits_vegetables_legumes'],
					positive_points: 1,
					positive_points_max: 10
				},
				grade: 'd',
				nutrients_available: 1,
				nutriscore_applicable: 1,
				nutriscore_computed: 1,
				score: 15
			}
		},
		nutriscore_2021_tags: ['d'],
		nutriscore_2023_tags: ['d'],
		nutriscore_data: {
			energy: 2240,
			energy_points: 6,
			energy_value: 2240,
			fiber: 3.57,
			fiber_points: 3,
			fiber_value: 3.57,
			fruits_vegetables_nuts_colza_walnut_olive_oils: '0',
			fruits_vegetables_nuts_colza_walnut_olive_oils_points: 0,
			fruits_vegetables_nuts_colza_walnut_olive_oils_value: 0,
			grade: 'd',
			is_beverage: 0,
			is_cheese: 0,
			is_fat: 0,
			is_water: 0,
			negative_points: 16,
			positive_points: 3,
			proteins: 3.57,
			proteins_points: 2,
			proteins_value: 3.57,
			saturated_fat: 8.93,
			saturated_fat_points: 8,
			saturated_fat_value: 8.9,
			score: 13,
			sodium: 214,
			sodium_points: 2,
			sodium_value: 214,
			sugars: 0,
			sugars_points: 0,
			sugars_value: 0
		},
		nutriscore_grade: 'd',
		nutriscore_score: 13,
		nutriscore_score_opposite: -13,
		nutriscore_tags: ['d'],
		nutriscore_version: '2021',
		nutrition_data: 'on',
		nutrition_data_per: 'serving',
		nutrition_data_prepared_per: '100g',
		nutrition_grade_fr: 'd',
		nutrition_grades: 'd',
		nutrition_grades_tags: ['d'],
		nutrition_score_beverage: 0,
		nutrition_score_debug: '',
		other_nutritional_substances_tags: [],
		packaging_materials_tags: [],
		packaging_recycling_tags: [],
		packaging_shapes_tags: [],
		packagings: [],
		packagings_materials: {},
		photographers_tags: ['openfoodfacts-contributors', 'xdcloudy'],
		pnns_groups_1: 'Salty snacks',
		pnns_groups_1_tags: ['salty-snacks', 'known'],
		pnns_groups_2: 'Appetizers',
		pnns_groups_2_tags: ['appetizers', 'known'],
		popularity_key: 15,
		popularity_tags: [
			'bottom-25-percent-scans-2019',
			'bottom-20-percent-scans-2019',
			'top-85-percent-scans-2019',
			'top-90-percent-scans-2019',
			'top-50000-de-scans-2019',
			'top-100000-de-scans-2019',
			'top-country-de-scans-2019',
			'bottom-25-percent-scans-2020',
			'top-80-percent-scans-2020',
			'top-85-percent-scans-2020',
			'top-90-percent-scans-2020',
			'top-5000-gb-scans-2020',
			'top-10000-gb-scans-2020',
			'top-50000-gb-scans-2020',
			'top-100000-gb-scans-2020',
			'top-country-gb-scans-2020',
			'bottom-25-percent-scans-2022',
			'top-80-percent-scans-2022',
			'top-85-percent-scans-2022',
			'top-90-percent-scans-2022',
			'top-50000-de-scans-2022',
			'top-100000-de-scans-2022',
			'top-country-de-scans-2022',
			'top-75-percent-scans-2023',
			'top-80-percent-scans-2023',
			'top-85-percent-scans-2023',
			'top-90-percent-scans-2023',
			'top-10000-bg-scans-2023',
			'top-50000-bg-scans-2023',
			'top-100000-bg-scans-2023',
			'top-country-bg-scans-2023',
			'top-50000-gb-scans-2023',
			'top-100000-gb-scans-2023',
			'top-100-kz-scans-2023',
			'top-500-kz-scans-2023',
			'top-1000-kz-scans-2023',
			'top-5000-kz-scans-2023',
			'top-10000-kz-scans-2023',
			'top-50000-kz-scans-2023',
			'top-100000-kz-scans-2023'
		],
		product_name: 'Original Tub',
		product_name_en: 'Original Tub',
		product_quantity: '40',
		product_quantity_unit: 'g',
		product_type: 'food',
		quantity: '40g',
		removed_countries_tags: [],
		rev: 18,
		scans_n: 3,
		selected_images: {
			front: {
				display: {
					ar: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_ar.5.400.jpg',
					en: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_en.12.400.jpg'
				},
				small: {
					ar: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_ar.5.200.jpg',
					en: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_en.12.200.jpg'
				},
				thumb: {
					ar: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_ar.5.100.jpg',
					en: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/front_en.12.100.jpg'
				}
			},
			ingredients: {
				display: {
					en: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/ingredients_en.14.400.jpg'
				},
				small: {
					en: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/ingredients_en.14.200.jpg'
				},
				thumb: {
					en: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/ingredients_en.14.100.jpg'
				}
			},
			nutrition: {
				display: {
					en: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/nutrition_en.16.400.jpg'
				},
				small: {
					en: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/nutrition_en.16.200.jpg'
				},
				thumb: {
					en: 'https://images.openfoodfacts.org/images/products/505/399/013/7787/nutrition_en.16.100.jpg'
				}
			}
		},
		serving_quantity: '28',
		serving_quantity_unit: 'g',
		serving_size: '28g',
		sortkey: 1591445530,
		states:
			'en:to-be-completed, en:nutrition-facts-completed, en:ingredients-completed, en:expiration-date-to-be-completed, en:packaging-code-to-be-completed, en:characteristics-to-be-completed, en:origins-to-be-completed, en:categories-completed, en:brands-completed, en:packaging-to-be-completed, en:quantity-completed, en:product-name-completed, en:photos-to-be-validated, en:packaging-photo-to-be-selected, en:nutrition-photo-selected, en:ingredients-photo-selected, en:front-photo-selected, en:photos-uploaded',
		states_hierarchy: [
			'en:to-be-completed',
			'en:nutrition-facts-completed',
			'en:ingredients-completed',
			'en:expiration-date-to-be-completed',
			'en:packaging-code-to-be-completed',
			'en:characteristics-to-be-completed',
			'en:origins-to-be-completed',
			'en:categories-completed',
			'en:brands-completed',
			'en:packaging-to-be-completed',
			'en:quantity-completed',
			'en:product-name-completed',
			'en:photos-to-be-validated',
			'en:packaging-photo-to-be-selected',
			'en:nutrition-photo-selected',
			'en:ingredients-photo-selected',
			'en:front-photo-selected',
			'en:photos-uploaded'
		],
		states_tags: [
			'en:to-be-completed',
			'en:nutrition-facts-completed',
			'en:ingredients-completed',
			'en:expiration-date-to-be-completed',
			'en:packaging-code-to-be-completed',
			'en:characteristics-to-be-completed',
			'en:origins-to-be-completed',
			'en:categories-completed',
			'en:brands-completed',
			'en:packaging-to-be-completed',
			'en:quantity-completed',
			'en:product-name-completed',
			'en:photos-to-be-validated',
			'en:packaging-photo-to-be-selected',
			'en:nutrition-photo-selected',
			'en:ingredients-photo-selected',
			'en:front-photo-selected',
			'en:photos-uploaded'
		],
		traces: '',
		traces_from_ingredients: '',
		traces_from_user: '(en) ',
		traces_hierarchy: [],
		traces_tags: [],
		unique_scans_n: 3,
		unknown_ingredients_n: 2,
		unknown_nutrients_tags: [],
		update_key: 'ecoscore',
		vitamins_tags: [],
		weighers_tags: []
	});

	const getNumbers = (str: string) => {
		const result = str.match(/\d+(\.\d+)?/g);
		return result ? result.map(Number) : [];
	};

	async function getProductData(barcode: string) {
		fetchingDetails = true;
		const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${barcode}.json`);
		productData = (await response.json()).product;
		console.log(productData);
		fetchingDetails = false;
	}

	function estimateEmissions(grade: string, quantity: string) {
		grade = grade.toUpperCase();
		const numQuantity = getNumbers(quantity)[0] / 1000;
		const emissionsFactors: Record<string, number> = {
			A: 0.1, // kg CO₂e per kg for grade A
			B: 0.3, // kg CO₂e per kg for grade B
			C: 0.6, // kg CO₂e per kg for grade C
			D: 1.0, // kg CO₂e per kg for grade D
			E: 2.0 // kg CO₂e per kg for grade E
		};

		const upperGrade = grade.toUpperCase();
		const emissions = emissionsFactors[upperGrade] * numQuantity;
		return emissions;
	}

	async function submitProduct() {
		const response = await fetch('/api/products', {
			method: 'POST',
			body: JSON.stringify({
				createdAt: new Date(),
				name: productData.product_name,
				emission: estimateEmissions(productData.ecoscore_grade.toUpperCase(), productData.quantity)
			})
		});
		toast.success(await response.text());
	}

	onMount(async () => {
		const codeReader = new BrowserMultiFormatReader();
		codeReader.decodeFromVideoDevice(
			(await codeReader.listVideoInputDevices())[0].deviceId,
			'video',
			(result, err) => {
				if (result) {
					getProductData(result.getText());
					scannerOpen = false;
					codeReader.reset();
				}
				if (err && !(err instanceof NotFoundException)) console.error(err);
			}
		);
	});
</script>

<H1>Products</H1>

{#if scannerOpen}
	<video id="video">
		<track kind="captions" />
	</video>
{/if}

{#if fetchingDetails}
	<div class="flex items-center gap-2">
		<LoaderCircle class="animate-spin" />
		<span>Getting details</span>
	</div>
{/if}

{#if productData}
	<div class="grid grid-cols-2 grid-rows-3 gap-2">
		<Card.Root>
			<Card.Header class="py-6">
				<Card.Title>Product name</Card.Title>
				<Card.Description>{productData.product_name}</Card.Description>
			</Card.Header>
		</Card.Root>

		<Card.Root class="row-span-4">
			<Card.Header class="py-6">
				<Card.Title>Image</Card.Title>
			</Card.Header>
			<Card.Content>
				<img alt="product logo" src={productData.image_url} />
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="py-6">
				<Card.Title>Ecoscore grade</Card.Title>
				<Card.Description>{productData.ecoscore_grade}</Card.Description>
			</Card.Header>
		</Card.Root>

		<Card.Root>
			<Card.Header class="py-6">
				<Card.Title>Quantity</Card.Title>
				<Card.Description>{productData.quantity}</Card.Description>
			</Card.Header>
		</Card.Root>

		<Card.Root>
			<Card.Header class="py-6">
				<Card.Title>Estimated emissions</Card.Title>
				<Card.Description>
					{estimateEmissions(productData.ecoscore_grade.toUpperCase(), productData.quantity)}
				</Card.Description>
			</Card.Header>
		</Card.Root>
	</div>

	<div class="flex w-full items-end">
		<Button class="ml-auto" onclick={submitProduct}>Add product</Button>
	</div>
{/if}
