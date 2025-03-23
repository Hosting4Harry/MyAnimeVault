<script lang="ts">
    import { page } from "$app/state";
    import { addToast } from "$lib/store/toast-store";
    import type { Anime, AnimeStatus } from "$lib/types/anime.types";
    import type { Option } from "$lib/types/data.types";
    let {
        isDialogOpen = $bindable(),
        selectedAnime = $bindable(),
        revalidate = $bindable(),
        filteredAnime,
    }: {
        isDialogOpen: boolean;
        revalidate: boolean;
        selectedAnime: Anime | null;
        filteredAnime: Anime[];
    } = $props();
    // Sample data - replace with your actual data source
    let animeList = $state<Anime[]>(filteredAnime);

    // Function to open edit modal
    function openEditModal(anime: Anime) {
        selectedAnime = anime;
        isDialogOpen = true;
    }

    // Function to delete anime
    async function deleteAnime(id: number) {
        if (confirm("Are you sure you want to delete this anime?")) {
            const res = await fetch(`/api/anime-list?id=${id}`, {
                method: "DELETE",
            });
            const response = await res.json();
            if (response.success) {
                addToast({
                    type: "success",
                    message: "Deleted successfully",
                });
                revalidate = !revalidate;
            } else {
                addToast({
                    type: "error",
                    message: (res as any)?.message || "Something went wrong",
                });
            }
        }
    }

    // Function to save edited anime
    function saveAnime(updatedAnime: Anime) {
        animeList = animeList.map((anime) =>
            anime.id === updatedAnime.id ? updatedAnime : anime,
        );
        isDialogOpen = false;
    }

    // Format date function
    function formatDate(dateString?: string): string {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    }

    // Get genres as readable string
    function formatGenres(genreIds: string): string {
        if (!genreIds) return ""; // Handle empty genreIds

        const genreIdArray = genreIds
            .split(",")
            .map((id) => parseInt(id.trim())); // Convert "1,2,3" -> [1, 2, 3]

        return page.data.genres
            .filter((genre: Option) => genreIdArray.includes(+genre.value)) // Match genres by ID
            .map((genre: Option) => genre.label)
            .join(", "); // Get genre names
    }

    // Status badge color
    function getStatusColor(status: AnimeStatus): string {
        const colors = {
            watching: "bg-blue-100 text-blue-800",
            completed: "bg-green-100 text-green-800",
            on_hold: "bg-purple-100 text-purple-800",
            dropped: "bg-red-100 text-red-800",
            plan_to_watch: "bg-yellow-100 text-yellow-800",
        };
        return (
            colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
        );
    }
    function getStatusIcon(status: AnimeStatus): string {
        switch (status) {
            case "watching":
                return "Watching⏰";
            case "completed":
                return "Completed🏆";
            case "plan_to_watch":
                return "Plan to Watch📅";
            case "dropped":
                return "Dropped⛔";
            default:
                return "";
        }
    }

    $effect(() => {
        animeList = filteredAnime;
        debugger;
    });
</script>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">My Anime List</h1>
        <button
            class="md:flex hidden px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            onclick={() => {
                selectedAnime = {
                    id: 0,
                    title: "",
                    status: "plan_to_watch",
                    episodes: 0,
                    episodesWatched: 0,
                    genreIds: "",
                };
                isDialogOpen = true;
            }}
        >
            Add New Anime
        </button>
    </div>

    <!-- Anime List Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Title</th
                    >
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Status</th
                    >
                    <th
                        class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Progress</th
                    >
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-normal uppercase tracking-wider"
                        >Genres</th
                    >
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Started</th
                    >
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Completed</th
                    >
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >Actions</th
                    >
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                {#if animeList.length === 0}
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap"> 
                            No records found
                        </td>
                    </tr>
                {/if}
                {#each animeList as anime (anime.id)}
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div
                                class="flex flex-col font-medium text-gray-900"
                            >
                                <span class="whitespace-normal"
                                    >{anime.title}</span
                                >
                                <span>
                                    Rating: {anime.rating
                                        ? `${anime.rating}/5.0`
                                        : "Not rated"}
                                </span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {getStatusColor(
                                    anime.status,
                                )}"
                            >
                                {getStatusIcon(anime.status)}
                            </span>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            <div
                                class="flex flex-col items-center relative group w-full"
                            >
                                <div
                                    class="w-24 bg-gray-200 rounded-full h-2.5"
                                >
                                    <div
                                        class="bg-blue-600 h-2.5 rounded-full"
                                        style="width: {(anime.episodesWatched /
                                            anime.episodes) *
                                            100}%"
                                    ></div>
                                </div>
                                <span
                                    class="absolute -top-5 hidden group-hover:block"
                                    >{anime.episodesWatched}/{anime.episodes}</span
                                >
                            </div>
                        </td>
                        <td
                            class="px-6 py-4 text-sm whitespace-normal text-gray-500"
                        >
                            {formatGenres(anime.genreIds)}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {formatDate(anime.startDate)}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {formatDate(anime.completionDate)}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                            <button
                                class="text-indigo-600 hover:text-indigo-900 mr-4"
                                onclick={() => openEditModal(anime)}
                            >
                                Edit
                            </button>
                            <button
                                class="text-red-600 hover:text-red-900"
                                onclick={() => deleteAnime(anime.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
